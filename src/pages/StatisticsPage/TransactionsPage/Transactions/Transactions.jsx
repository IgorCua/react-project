import TransactionsItem from '../TransactionsItem/TransactionsItem';
import css from './Transactions.module.scss';
import ModalTransaction from '../ModalTransactions/ModalTransactions';
import {
  removeTransaction,
} from 'redux/transactions/transactionsOperations';
import { selectedTransactions } from 'redux/transactions/transactionsSelector';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

const Transactions = () => {
  const leter = useSelector(selectedTransactions);
  const [transaction, setTransaction] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setTransaction(leter);
  }, [leter]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const filterIt = id => {
    const filteredTransaction = transaction.filter(el => el._id !== id);
    setTransaction(filteredTransaction);
    dispatch(removeTransaction(id));
  };

  return (
    <>
      {transaction?.length === 0 && (
        <div className={css.noTransactionWrapper}>
          <p className={css.noTransactionText}>You have no transactions</p>
        </div>
      )}
      <ul className={css.transactionList}>
        {transaction &&
          transaction.map(({ _id: id, sum, comment, category, date }) => (
            <TransactionsItem
              openModal={openModal}
              key={id}
              id={id}
              sum={sum}
              comment={comment}
              category={category}
              date={date}
              filterIt={filterIt}
            />
          ))}
      </ul>
      {isModalOpen &&
        transaction.map(({ _id: id }) => (
          <ModalTransaction closeModal={closeModal} id={id} />
        ))}
    </>
  );
};

export default Transactions;
