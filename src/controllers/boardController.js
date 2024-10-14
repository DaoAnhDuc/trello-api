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
    next(error)
    // res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ errors: error.message });
  } 
};

export const boardController = {
  createNew,
};
