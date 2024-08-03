import { useEffect, useState } from 'react';
import './App.css';
import { makeTable } from './utils/makeArray';
import { Modal } from './modal/modal';

function App() {
    const [matrix, setMatrix] = useState<boolean[][]>([[]]);
    const [modal, setModal] = useState<boolean>(false);
    const [deleteRowNum, setDeleteRowNum] = useState(0);
    const [deleteColNum, setDeleteColNum] = useState(0);
    const [changeInfo, setChangeInfo] = useState({ type: 'string', colomn: 0, row: 0 });

    async function getArrayTreatment() {
        try {
            const data = await makeTable();
            setMatrix(data);
        } catch (error) {
            alert(`${error}`);
        }
    }

    useEffect(() => {
        getArrayTreatment();
    }, []);

    const handleClick = (rowIndex: number, colIndex: number) => {
        setMatrix(() => {
            const newMatrix = [...matrix];
            newMatrix[rowIndex] = [...newMatrix[rowIndex]];
            newMatrix[rowIndex][colIndex] = !newMatrix[rowIndex][colIndex];
            return [...newMatrix];
        });
    };

    const deleteCol = (colIndex: number) => {
        setMatrix(() => {
            return matrix.map((row) => row.filter((_, index) => index !== colIndex));
        });
    };

    const newCol = () => {
        setMatrix(() => {
            for (let i = 0; i < matrix.length; i++) {
                matrix[i].push(false);
            }
            return matrix;
        });
    };

    const deleteRow = (rowIndex: number) => {
        setMatrix(() => {
            return matrix.filter((_, index) => index !== rowIndex);
        });
    };

    const newRow = () => {
        setMatrix(() => {
            matrix.push(matrix[0].map(() => false));
            return matrix;
        });
    };

    return (
        <>
            <h1>Test Task for Development grove</h1>

            <Modal
                open={modal}
                setModalClose={setModal}
                type={changeInfo.type}
                colomn={changeInfo.colomn}
                row={changeInfo.row}
            />

            <div className="deleteDiv">
                <p>Удалить строку №</p>
                <input
                    type="number"
                    min={1}
                    max={matrix.length}
                    onChange={(e) => setDeleteRowNum(Number(e.target.value))}
                ></input>
                <button
                    disabled={deleteRowNum === 0 || matrix.length === 1}
                    onClick={() => {
                        setChangeInfo({ type: 'Удаление', colomn: 0, row: deleteRowNum });
                        setModal(true);
                        deleteRow(deleteRowNum - 1);
                    }}
                >
                    Удалить
                </button>
            </div>
            <div className="deleteDiv">
                <p>Удалить столбец №</p>
                <input
                    type="number"
                    min={1}
                    max={matrix[0].length}
                    onChange={(e) => setDeleteColNum(Number(e.target.value))}
                ></input>
                <button
                    disabled={deleteColNum === 0 || matrix[0].length === 1}
                    onClick={() => {
                        setChangeInfo({ type: 'Удаление', colomn: deleteColNum, row: 0 });
                        setModal(true);
                        deleteCol(deleteColNum - 1);
                    }}
                >
                    Удалить
                </button>
            </div>

            <div className="deleteDiv">
                <button
                    disabled={matrix[0].length === 100}
                    onClick={() => {
                        setChangeInfo({ type: 'Добавление', colomn: matrix[0].length + 1, row: 0 });
                        setModal(true);
                        newCol();
                    }}
                >
                    Добавить столбец
                </button>
                <button
                    disabled={matrix.length === 100}
                    onClick={() => {
                        setChangeInfo({ type: 'Добавление', colomn: 0, row: matrix.length });
                        setModal(true);
                        newRow();
                    }}
                >
                    Добавить строку
                </button>
            </div>
            <div className="tableWrapper">
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            {matrix[0].map((_, index) => (
                                <th key={`Обработка ${index}`}>
                                    {`Обработка № ${index + 1}`}
                                    <button
                                        disabled={matrix[0].length === 1}
                                        onClick={() => {
                                            setChangeInfo({
                                                type: 'Удаление',
                                                colomn: index + 1,
                                                row: 0,
                                            });

                                            window.scrollTo(0, 0);
                                            setModal(true);
                                            deleteCol(index);
                                        }}
                                    >
                                        Удалить
                                    </button>
                                </th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {matrix.map((row, rowIndex) => (
                            <tr key={`Строка ${rowIndex}`}>
                                <th key={rowIndex + 'Заказ'}>
                                    {'Заказ №' + (rowIndex + 1)}
                                    <button
                                        disabled={matrix.length === 1}
                                        onClick={() => {
                                            setChangeInfo({
                                                type: 'Удаление',
                                                colomn: 0,
                                                row: rowIndex + 1,
                                            });
                                            window.scrollTo(0, 0);
                                            setModal(true);
                                            deleteRow(rowIndex);
                                        }}
                                    >
                                        Удалить
                                    </button>
                                </th>
                                {row.map((cell, colIndex) => (
                                    <td
                                        onClick={() => {
                                            setChangeInfo({
                                                type: 'Изменение статуса',
                                                colomn: colIndex + 1,
                                                row: rowIndex + 1,
                                            });
                                            window.scrollTo(0, 0);
                                            setModal(true);
                                            handleClick(rowIndex, colIndex);
                                        }}
                                        key={`Ячейка ${cell} и ${colIndex}`}
                                        className={cell ? 'colorForTrue' : 'colorForFalse'}
                                    >
                                        НАЖМИ ЧТОБЫ ПОМЕНЯТЬ СТАТУС
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default App;
