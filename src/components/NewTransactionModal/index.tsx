import { FormEvent, useState } from 'react';
import Modal from 'react-modal';
import { useTransactions } from '../../hooks/useTransactions';

import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg'
import closeImg from '../../assets/close.svg';

import { Container, TransactionTypeContainer, RadioBox } from './styles';


//onRequestClose uma interface apontando para uma funçao
interface NewTransactionModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}: NewTransactionModalProps){
    const {createTransaction} = useTransactions();

    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState('deposit');

    async function handleCreateNewTransaction(event: FormEvent){
        event.preventDefault();

        await createTransaction({
            title,
            amount,
            category,
            type,
        })

        setTitle('');
        setAmount(0);
        setCategory('');
        setType('deposit');
        onRequestClose()
    }

    return(
    <Modal 
        //se o modal esta aberto ou fechado, boolean, true=aberto
        isOpen={isOpen}
        //ao apertar esc, ou clicar fora do modal, ira ativar o metodo de fechamento
        //no caso esta executando uma funçao que traça como false o boolean
        onRequestClose={onRequestClose}
        //overlay, parte externa do modal
        overlayClassName="react-modal-overlay"
        //className ira estilizar somente o conteudo interno
        className="react-modal-content"
        >

            <button 
            type="button" 
            onClick={onRequestClose} 
            className="react-modal-close"
            >
                <img src={closeImg} alt="Fechar modal"  />
            </button>


            <Container onSubmit={handleCreateNewTransaction}>
                <h2>Cadastrar transação</h2>

                <input 
                    placeholder="Titulo"
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                />

                <input 
                    type="number"
                    placeholder="Valor"
                    value={amount}
                    //Number() - transformou o valor de string, do event, para number
                    onChange={event => setAmount(Number(event.target.value))}
                />

                <TransactionTypeContainer>
                    {/*
                    onClick- seta type com o valor do botao clicado
                    isActive- sera ativo quando for true, no caso se o type for igual ao proprio
                    */}
                    <RadioBox
                        type="button"
                        onClick={() => { setType('deposit')}}
                        isActive={type === 'deposit'}
                        activeColor="green"
                    >
                        <img src={incomeImg} alt="Entrada"/>
                        <span>Entrada</span>
                    </RadioBox>

                    <RadioBox
                        type="button"
                        onClick={() => { setType('withdraw')}}
                        isActive={type === 'withdraw'}
                        activeColor="red"
                    >
                        <img src={outcomeImg} alt="Saida"/>
                        <span>Saida</span>
                    </RadioBox>
                </TransactionTypeContainer>

                <input 
                    placeholder="Categoria"
                    value={category}
                    onChange={event => setCategory(event.target.value)}
                />

                <button type="submit">
                    Cadastrar
                </button>
            </Container>
        </Modal>
    );
}