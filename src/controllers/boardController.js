/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import { StatusCodes } from "http-status-codes";
import { boardService } from "~/services/boardService";
import ApiError from "~/utils/ApiError";

const createNew = async (req, res, next) => {
  try {
    const createdBoard = await boardService.createNew(req.body);
    // throw new ApiError(StatusCodes.BAD_GATEWAY, "Test Error");
    res.status(StatusCodes.CREATED).json(createdBoard);
  } catch (error) {
    console.log(error);
    next(error);
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: error.message });
  }
};

const getDetails = async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const board = await boardService.getDetails(boardId);
    res.status(StatusCodes.OK).json(board);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const update = async (req, res, next) => {
  try {
    const boardId = req.params.id;
    const updatedBoard = await boardService.update(boardId, req.body);
    res.status(StatusCodes.OK).json(updatedBoard);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const boardController = {
  createNew,
  getDetails,
  update,
};
