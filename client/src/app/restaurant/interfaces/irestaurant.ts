import IDish from '../../dish/interfaces/idish';

import IMenu from '../../menu/interfaces/imenu';
export default interface IRestaurant {
  _id?: string;
  name?: string;
  location?: string;
  imagePath?: string;
  menus: IMenu [];
  dishes: IDish [];
}
