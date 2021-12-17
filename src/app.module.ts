import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AppResolver } from './app.resolver';
import { PubSub } from 'graphql-subscriptions';
@Module({
  imports: [
    GraphQLModule.forRoot({
      playground: true,
      debug: true,
      cors: true,
      autoSchemaFile: true,
      installSubscriptionHandlers: true,
      subscriptions: {
        'graphql-ws': true,
        'subscriptions-transport-ws': true,
      },
      // for some changes on the Graphql's Behaviour the propery "context" need to be changed
      // eg: Authentication over Subscriptions
    }),
  ],
  controllers: [],
  providers: [
    AppResolver,
    {
      provide: 'PUB_SUB',
      useValue: new PubSub(),
    },
  ],
})
export class AppModule {}
