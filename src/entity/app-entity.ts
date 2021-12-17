import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType('App')
export class AppEntity {
  @Field(() => ID, { name: 'id' })
  id: string;

  @Field(() => String, { name: 'appName' })
  appName: string;

  @Field(() => Boolean, { name: 'isActive' })
  isActive: boolean;
}
