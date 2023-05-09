import { ServerRespond } from './DataStreamer';

export interface Row {
  ratio: number,
  price_abc: number,
  price_def: number,
  timestamp: Date,
  upper_bound: number,
  lower_bound : number,
  trigger_alert: number | undefined,
}


export class DataManipulator {
  static generateRow(serverResponds: ServerRespond[]) : Row{

    const priceABC = (serverResponds[0].top_ask.price + serverResponds[0].top_bid.price) / 2; // first stock is ABC
    const priceDEF = (serverResponds[1].top_ask.price + serverResponds[1].top_bid.price) / 2; // second stock is DEF
    const ratio = priceABC / priceDEF;
    const timeStamp = serverResponds[0].timestamp > serverResponds[1].timestamp ? serverResponds[0].timestamp : serverResponds[1].timestamp
    const upperBound =  1 + 0.1;
    const lowerBound = 1 - 0.1; // constant for any data poin

    return {
      ratio,
      price_abc : priceABC,
      price_def : priceDEF,
      timestamp : timeStamp,
      upper_bound : upperBound,
      lower_bound : lowerBound,
      trigger_alert : (ratio > upperBound || ratio < lowerBound) ? ratio : undefined,
    };
  }
}
