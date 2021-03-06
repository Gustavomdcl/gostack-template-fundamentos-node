import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({title,value,type}:RequestDTO): Transaction {
    const balance = this.transactionsRepository.getBalance();
    if(balance.total<value&&type==='outcome'){
      throw Error(`Your transaction's outcome value is higher than your total.`);
    }

    const transaction = this.transactionsRepository.create({title,value,type});

    return transaction;
  }
}

export default CreateTransactionService;
