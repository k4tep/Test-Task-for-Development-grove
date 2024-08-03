import './modal.css';

interface IProps {
    open: boolean;
    setModalClose: React.Dispatch<React.SetStateAction<boolean>>;
    type: string;
    colomn: number;
    row: number;
}

export function Modal({ open, setModalClose, type, colomn, row }: IProps) {
    return (
        <div className={open ? 'modal open' : 'close'}>
            <div>
                <h1>Вы внесли изменения в таблицу</h1>
                <p>Тип изменения: {type}</p>
                <p>
                    Позиция: столбец {colomn} и строка {row}
                </p>
                <button onClick={() => setModalClose(false)}>Понятно</button>
            </div>
        </div>
    );
}
