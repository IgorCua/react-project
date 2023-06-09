import moment from 'moment';
import Icon from '../../../../components/Icon/Icon';
import s from './TransactionsItem.module.scss';

const TransactionsItem = ({
  openModal,
  updateTransaction,
  id,
  sum,
  date,
  category,
  comment,
  filterIt,
}) => {
  return (
    <li
      className={s.transactionItem}
      key={id}
      onClick={() => updateTransaction(id, date)}
    >
      <div className={s.transactionThumb}>
        <div className={s.commentWrapper}>
          <p className={s.transactionDate}>{moment(date).format('MM.YYYY')}</p>
          <p className={s.transactionComment}>{comment}</p>
        </div>

        <div>
          <p className={s.transactionSum}>{sum} ₴</p>
        </div>
      </div>
      <div className={s.thumb}>
        <p className={s.transactionCategory}>{category}</p>
        <div className={s.buttonThumb}>
          <button className={s.buttonItem} type="button" onClick={openModal}>
            <Icon
              name={'icon-pencil'}
              width={'22'}
              height={'22'}
              className={'icon-pencil'}
            />
          </button>
          <button
            className={s.buttonItem}
            type="button"
            onClick={() => filterIt(id)}
          >
            <Icon
              name={'icon-trash'}
              width={'24'}
              height={'24'}
              className={'icon-trash'}
            />
          </button>
        </div>
      </div>
    </li>
  );
};

export default TransactionsItem;
