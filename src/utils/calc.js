export const calcSubPrice = (item) => {
   return item.count * item.room.price;
 };
 export const calcTotalPrice = (items) => {
   let total = 0;
   items.forEach((item) => {
     total += item.subPrice;
   });
 
   return total;
 };
 