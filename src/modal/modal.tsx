import './modal.css';

interface IProps {
    open: boolean;
    setModalClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export function Modal({ open, setModalClose }: IProps) {
    return (
        <div className={open ? 'modal open' : 'close'}>
            <div>
                <h1>Вы внесли изменения в таблицу</h1>
                <button onClick={() => setModalClose(false)}>Понятно</button>
            </div>
        </div>
    );
}
