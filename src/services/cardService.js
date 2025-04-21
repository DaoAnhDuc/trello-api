/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { cardModel } from "~/models/cardModel";
import { columnModel } from "~/models/columnModel";
import { slugify } from "~/utils/formatters";

const createNew = async (reqBody) => {
  try {
    const newCard = {
      ...reqBody,
      slug: slugify(reqBody.title),
    };

    const createCard = await cardModel.createNew(newCard);
    const getNewCard = await cardModel.findOneById(createCard.insertedId);
    if (getNewCard) {
      await columnModel.pushCardOrderIds(getNewCard);
    }
    //trả kết quả về cho service
    return getNewCard;
  } catch (error) {
    throw error;
  }
};

export const cardService = {
  createNew,
};
