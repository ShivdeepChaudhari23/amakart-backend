import Item from "../models/item-model.js";
import ItemAPIFeatures from "../utils/item-api-features.js";

const catchAsync = fn => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  }
}

const getItems = catchAsync(async (req, res) => {
  const features = new ItemAPIFeatures(Item.find(), req.query).filterFields();
  const items = await features.query;
  res.status(200).json({
    message: 'Success',
    length: items.length,
    data: { items },
  });
});

export {
  getItems,
}
