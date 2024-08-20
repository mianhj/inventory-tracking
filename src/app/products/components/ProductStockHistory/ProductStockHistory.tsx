'use client';
import EventEmitter from 'reactjs-eventemitter';
import { useState, useEffect, useCallback } from 'react';
import { DateTime } from 'luxon';
import StockHistory from '@/types/StockHistory';
import clsx from 'clsx';
export type ProductStockHistoryProps = {
  id: string;
};

function ProductStockHistory({ id }: ProductStockHistoryProps) {
  const [loading, setLoading] = useState(false);
  const [stockHistoryList, setStockHistoryList] = useState<StockHistory[]>([]);

  const fetchHistory = useCallback(async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/stock_history/${id}?limit=${50}`);

      const data: {
        stockHistory: StockHistory[];
        totalCount: number;
        page: number;
      } = await res.json();

      setStockHistoryList(data.stockHistory);
    } catch (error) {
      console.error('Failed to fetch products', error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  useEffect(() => {
    EventEmitter.subscribe('product-updated', () => {
      fetchHistory();
    });
  }, [fetchHistory]);

  return (
    <div>
      <p className="text-2xl mb-3">History</p>

      {loading ? (
        <>
          <p>Loading...</p>
        </>
      ) : (
        <>
          {stockHistoryList.map((history) => {
            const isInc = history.difference > 0;
            return (
              <div key={history.id} className="px-3 py-1 mb-2 shadow-md">
                <div className="flex justify-between">
                  <p className="text-sm text-gray-800">
                    {DateTime.fromISO(history.createdAt).toFormat(
                      'yyyy LLL dd h:m'
                    )}
                  </p>
                  <p
                    className={clsx('text-2xl', {
                      'text-green-600': isInc,
                      'text-red-600': !isInc,
                    })}
                  >
                    {isInc ? `+${history.difference}` : `${history.difference}`}
                  </p>
                </div>
                <p className="text-sm text-gray-800">{history.description}</p>
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}

export default ProductStockHistory;
