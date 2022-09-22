
export type IType = 'hero' | 'weapon';

export interface IData {
  id: number;
  desc: string;
  slug: string;
  created_at: string;
  type: IType;

}

export interface ITag{
    data:IData[],
    total:number
}