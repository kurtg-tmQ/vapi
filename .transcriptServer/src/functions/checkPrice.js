async function checkPrice(functionArgs) {
  let model = functionArgs.model;
  if (model?.toLowerCase().includes('pro')) {
    return JSON.stringify({ price: 249 });
  } else if (model?.toLowerCase().includes('max')) {
    return JSON.stringify({ price: 549 });
  } else {
    return JSON.stringify({ price: 149 });
  }
}

export default checkPrice;