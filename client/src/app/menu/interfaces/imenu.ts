export default interface IMenu {
  // [key: string]: string | string[] | undefined | number;
  _id?: string;
  name?: string;
  price?: number;
  restaurant?: string;
  dishes: string [];
}
