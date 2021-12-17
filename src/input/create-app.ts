import { Field, InputType } from '@nestjs/graphql';

@InputType('CreateApp')
export class CreateApp {
  @Field(() => String, { name: 'appName' })
  appName: string;

  @Field(() => Boolean, { name: 'isActive' })
  isActive: boolean;
}
