import { Domain } from '@models/PostgreSQL/domain.model';
import {
  AutoIncrement,
  BelongsTo,
  Column,
  Comment,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';

export interface AccountSchema {
  id: number;
  domainId?: string;
  domain?: Domain;
  email: string;
  nickname?: string;
  companyName?: string;
  givenName?: string;
  familyName?: string;
  picture?: string;
}

@Table({ timestamps: true, modelName: 'Account' })
export class Account extends Model<AccountSchema> {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @ForeignKey(() => Domain)
  @Column
  domainId: string;

  @BelongsTo(() => Domain)
  domain: Domain;

  @Unique
  @Column
  email: string;

  @Column nickname: string;
  @Column companyName: string;

  @Comment('Auth0 given_name')
  @Column
  givenName: string;

  @Comment('Auth0 family_name')
  @Column
  familyName: string;

  @Column picture: string;
}
