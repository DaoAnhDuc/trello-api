/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from "http-status-codes";
import ApiError from "~/utils/ApiError";
import { slugify } from "~/utils/formatters";

const createNew = async (reqBody) => {
  try {
    const newBoard = {
        ...reqBody,
        slug: slugify(reqBody.title)
    }
    //trả kết quả về cho service
    return newBoard
  } catch (error) {
    throw error
  }
};

export const boardService = {
  createNew,
};
