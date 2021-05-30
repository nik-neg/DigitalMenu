import IDish from '../../dish/interfaces/idish';
export default interface IMenu {
  _id?: string;
  name?: string;
  price?: number;
  restaurant?: string;
  dishes: IDish [];
}
