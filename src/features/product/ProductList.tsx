import Card from './Card';
import { CardProps, ProductsProps } from '../../utils/interfaces';
import Button from '../../ui/common/Button';
import { useCallback, useState } from 'react';
import { READ_MORE_CHUNK_SIZE } from '../../utils/constants';
import EmptyContent from '../../ui/common/EmptyContent';

function ProductList({ products, type }: ProductsProps) {
  const [chunkSize, setChunkSize] = useState(READ_MORE_CHUNK_SIZE);
  const [displayedProducts, setDisplayedProducts] = useState(
    products.slice(0, chunkSize)
  );

  const onReadMoreHandler = useCallback(() => {
    const newChunkSize = chunkSize + READ_MORE_CHUNK_SIZE;
    setChunkSize(newChunkSize);
    setDisplayedProducts(products.slice(0, newChunkSize));
  }, [chunkSize, products]);

  if (!products.length) return <EmptyContent />;

  if (type === 'small')
    return (
      <div className='flex flex-col justify-center items-center'>
        <div className='flex flex-wrap gap-4 w-full mb-10'>
          {displayedProducts.map(
            ({ id, title, image, price, category }: CardProps) => {
              return (
                <Card
                  key={id}
                  id={id}
                  title={title}
                  price={price}
                  image={image}
                  category={category}
                />
              );
            }
          )}
        </div>
        {chunkSize < products.length && (
          <span className='mb-10'>
            <Button type='secondary' onClick={onReadMoreHandler}>
              Read More
            </Button>
          </span>
        )}
      </div>
    );

  return (
    <div className='flex flex-wrap gap-4 w-full'>
      {products.map(({ id, title, image, price, category }: CardProps) => {
        return (
          <div
            key={id}
            className='transform transition-transform duration-500 hover:scale-105'
          >
            <Card
              id={id}
              title={title}
              price={price}
              image={image}
              category={category}
            />
          </div>
        );
      })}
    </div>
  );
}

export default ProductList;
