import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db';

interface UserAttributes {
  id: number;
  email: string;
  passwordHash: string;
  role: 'rider' | 'professional' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
}

interface UserCreationAttributes
  extends Optional<UserAttributes, 'id' | 'createdAt' | 'updatedAt'> {}

class User
  extends Model<UserAttributes, UserCreationAttributes>
  implements UserAttributes
{
  public id!: number;
  public email!: string;
  public passwordHash!: string;
  public role!: 'rider' | 'professional' | 'admin';
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

User.init(
  {
    id: {
      type:           DataTypes.INTEGER.UNSIGNED,
      autoIncrement:  true,
      primaryKey:     true
    },
    email: {
      type:           DataTypes.STRING,
      allowNull:      false,
      unique:         true,
      validate:       { isEmail: true }
    },
    passwordHash: {
      type:           DataTypes.STRING,
      allowNull:      false
    },
    role: {
      type:           DataTypes.ENUM('rider','professional','admin'),
      allowNull:      false,
      defaultValue:   'rider'
    }
  },
  {
    sequelize,
    tableName: 'Users',
    timestamps: true
  }
);

export default User;
