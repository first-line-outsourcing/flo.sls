import { getEnv, isStage } from '@helper/environment';
import { dynamoose } from '@services/dynamoose';
import { Document } from 'dynamoose/dist/Document';

export interface IconikTokenInterface {
  token: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface IconikTokenSchema {
  token: string;
}

export class IconikToken extends Document implements IconikTokenSchema {
  token: string;
}

export const iconikTokenSchema = new dynamoose.Schema(
  {
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

export const IconikTokenModel = dynamoose.model<IconikToken>(getEnv('ICONIK_TOKENS_TABLE_NAME'), iconikTokenSchema, {
  create: isStage('local'),
  update: false,
});
