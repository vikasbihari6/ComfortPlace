const ratings = {
    hotel_a: netrat
};
const starTotal = 5;
 
for(const rating in ratings) {  
  // 2
  const starPercentage = (ratings[rating] / starTotal) * 100;
  // 3
  const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
  // 4
  console.log(starPercentageRounded);
  document.querySelector(`.stars-inner`).style.width = starPercentageRounded; 
}