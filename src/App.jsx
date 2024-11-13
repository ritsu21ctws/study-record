import { useEffect, useState } from "react";
import "./App.css";
import { addRecord, deleteRecord, getAllRecords } from "../utils/supabaseFunctions";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [time, setTime] = useState(0);
  const [records, setRecords] = useState([]);
  const [error, setError] = useState("");
  const [totalTime, setTotalTime] = useState(0);

  const getRecords = async () => {
    const records = await getAllRecords();
    setRecords(records);

    // 合計時間の計算
    const totalTime = records.reduce((accumulator, currentValue) => accumulator + parseInt(currentValue.time), 0);
    setTotalTime(totalTime);

    setIsLoading(false);
  }

  // 画面初期表示
  useEffect(() => {
    getRecords();
  }, []);

  const onChangeTitle = event => setTitle(event.target.value);
  const onChangeTime = event => setTime(event.target.value);

  const onClickAdd = async () => {
    if (title === "" || time === "" || time === 0) {
      setError("入力されていない項目があります");
      return;
    }

    const result = await addRecord({
      title,
      time
    });

    if (result.status !== 201) {
      setError("登録処理に失敗しました");
      return;
    }

    getRecords();

    // 初期化
    setTitle("");
    setTime(0);
    setError("");
  }

  const onClickDelete = async (id) => {
    if (confirm("削除します。よろしいですか？")) {
      const result = await deleteRecord(id);

      if (result.status !== 204) {
        setError("削除処理に失敗しました");
        return;
      }

      getRecords();

      // 初期化
      setError("");
    }
  }

  if (isLoading) {
    return <>
      <h1>Loading...</h1>
    </>;
  } else {
    return <>
      <h1 data-testid="title">学習記録一覧</h1>
      <p>
        学習内容
        <input type="text" value={title} onChange={onChangeTitle} data-testid="inputText" />
      </p>
      <p>
        学習時間
        <input type="number" min="0" value={time} onChange={onChangeTime} data-testid="inputTime"/>
        時間
      </p>
      <p>入力されている学習内容：{title}</p>
      <p>入力されている時間：{time}時間</p>
      <ul>
        {records.map((record) => (
          <li key={record.id}>
            {`${record.title} ${record.time}時間`}<button onClick={() => onClickDelete(record.id)}>削除</button>
          </li>
        ) )}
      </ul>
      <button onClick={onClickAdd}>登録</button>
      {error !== "" && <p class="error">{error}</p>}
      <p>合計時間：{totalTime} / 1000 (h)</p>
    </>;
  }
}

export default App;
