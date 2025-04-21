/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from "http-status-codes";
import { cloneDeep } from "lodash";
import { boardModel } from "~/models/boardModel";
import ApiError from "~/utils/ApiError";
import { slugify } from "~/utils/formatters";

const createNew = async (reqBody) => {
  try {
    const newBoard = {
      ...reqBody,
      slug: slugify(reqBody.title),
    };

    const createBoard = await boardModel.createNew(newBoard);
    const getNewBoard = await boardModel.findOneById(createBoard.insertedId);
    //trả kết quả về cho service
    return getNewBoard;
  } catch (error) {
    throw error;
  }
};

const getDetails = async (boradId) => {
  try {
    const board = await boardModel.getDetails(boradId);
    if (!board) {
      throw new ApiError(StatusCodes.NOT_FOUND, "Board Not Found");
    }

    const resBoard = cloneDeep(board);
    resBoard.columns.forEach((column) => {
      column.cards = resBoard.cards.filter((card) => card.columnId.toString() == column._id.toString());
    });
    delete resBoard.cards;
    //trả kết quả về cho service
    return resBoard;
  } catch (error) {
    throw error;
  }
};

const update = async (boradId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now(),
    };
    const updatedBoard = await boardModel.update(boradId, updateData);
    return updatedBoard;
  } catch (error) {
    throw error;
  }
};

export const boardService = {
  createNew,
  getDetails,
  update,
};
