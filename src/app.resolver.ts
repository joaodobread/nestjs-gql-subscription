import { Inject } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';
import { AppEntity } from './entity';
import { CreateApp } from './input';
import * as crypto from 'crypto';

@Resolver(() => AppEntity)
export class AppResolver {
  private apps: AppEntity[] = [];

  constructor(
    @Inject('PUB_SUB')
    private readonly pubSub: PubSub,
  ) {}

  @Query(() => [AppEntity], { name: 'apps' })
  async appQuery() {
    return this.apps;
  }

  @Mutation(() => AppEntity, { name: 'newApp' })
  async appMutation(@Args('input') app: CreateApp) {
    const newApp = new AppEntity();
    newApp.appName = app.appName;
    newApp.isActive = app.isActive;
    newApp.id = crypto.randomBytes(8).toString('hex');
    this.apps.push(newApp);
    this.pubSub.publish('newAppCreated', newApp);
    return newApp;
  }

  @Subscription(() => AppEntity, {
    name: 'newAppCreated',
    resolve: (payload) => payload,
  })
  async appSubscription() {
    return this.pubSub.asyncIterator('newAppCreated');
  }
}
