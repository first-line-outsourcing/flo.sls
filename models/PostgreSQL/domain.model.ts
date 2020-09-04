import { Account } from '@models/PostgreSQL/account.model';
import { Column, HasMany, Model, PrimaryKey, Table, Unique } from 'sequelize-typescript';

export interface DomainSchema {
  id: string;
  accounts: Account[];
}

@Table({ timestamps: true, modelName: 'Domain' })
export class Domain extends Model<DomainSchema> {
  @Unique
  @PrimaryKey
  @Column
  id: string;

  @HasMany(() => Account, { onDelete: 'SET NULL', onUpdate: 'SET NULL' })
  accounts: Account[];
}
