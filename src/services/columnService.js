/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { boardModel } from "~/models/boardModel";
import { columnModel } from "~/models/columnModel";
import { slugify } from "~/utils/formatters";

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody,
      slug: slugify(reqBody.title),
    };

    const createColumn = await columnModel.createNew(newColumn);
    const getNewColumn = await columnModel.findOneById(createColumn.insertedId);

    if(getNewColumn){
      getNewColumn.cards = []
      await boardModel.pushColumnOrderIds(getNewColumn);
    }
    //trả kết quả về cho service
    return getNewColumn;
  } catch (error) {
    throw error;
  }
};



export const columnService = {
  createNew,
};
