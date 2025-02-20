import React, { useEffect, useState } from "react";
import TokenRow from "./common/TokenRow";
import "./style.css";

const TokenTable = ({ tokenData }) => {
  const [sortedData, setSortedData] = useState([...tokenData]);
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [data, setData] = useState(null)

  const sortData = (key) => {
    let direction = "asc";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "asc"
    ) {
      direction = "desc";
    }
    const sorted = [...tokenData].sort((a, b) => {
      if (a[key] * 1 < b[key] * 1) {
        return direction === "asc" ? -1 : 1;
      }
      if (a[key] * 1 > b[key] * 1) {
        return direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    setSortedData([...sorted]);
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (columnName) => {
    if (sortConfig && sortConfig.key === columnName) {
      return sortConfig.direction === "asc" ? "▲" : "▼";
    }
    return null;
  };

  const tableStyle = {
    backgroundColor: "#191919",
    overflowY: "auto",
    maxHeight: "90vh",
    width: "100%",
    cursor: "pointer",
  };
  useEffect(() => {
    setSortedData(tokenData);
  }, [tokenData]);

  return (
    <>
      <div className="table-container font-header" style={tableStyle}>
        <table
          className="custom-table"
          style={{
            width: "100%",
            marginTop: "15px",
            marginBottom: "20px",
            fontSize: "medium",
          }}
        >
          <thead className="font-header">
            <tr>
              <th
                onClick={() => sortData("symbol")}
                style={{ textAlign: "start" }}
              >
                TOKEN {renderSortIcon("symbol")}
              </th>
              <th
                onClick={() => sortData("derivedUSD")}
                style={{ textAlign: "start" }}
              >
                PRICE {renderSortIcon("derivedUSD")}
              </th>
              <th
                onClick={() => sortData("tradeVolumeUSD")}
                style={{ textAlign: "start" }}
              >
                MARKETCAP {renderSortIcon("tradeVolumeUSD")}
              </th>
              <th
                onClick={() => sortData("totalLiquidityUSD")}
                style={{ textAlign: "start" }}
              >
                LIQUIDITY {renderSortIcon("totalLiquidityUSD")}
              </th>
              <th
                onClick={() => sortData("tradeVolume")}
                style={{ textAlign: "start" }}
              >
                VOLUME {renderSortIcon("tradeVolume")}
              </th>
              <th style={{ textAlign: "start", paddingRight: "80px" }}>
                TOKEN AGE
              </th>
            </tr>
          </thead>
          <tbody style={{ backgroundColor: "black" }}>
            {[...sortedData].map((rowData, index) => (
              <TokenRow onClick={setData} data={rowData} key={index} />
            ))}
          </tbody>
        </table>
      </div>
      {
        data && <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 9999,
            background: "black",
            width: "100vw",
            height: "100vh",
            color: "white",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            transform: "translate(-45%,-25%)"
          }}
        >
          {/* Close Button */}
          <button
            onClick={() => setData(null)} // Replace onClose with your function to hide the modal
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "red",
              color: "white",
              border: "none",
              padding: "10px 15px",
              cursor: "pointer",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          >
            ✕
          </button>

          <pre
            style={{
              background: "#222",
              padding: "20px",
              borderRadius: "10px",
              overflowX: "auto",
              maxWidth: "90%",
              maxHeight: "90%",
              whiteSpace: "pre-wrap",
            }}
          >
            <code>{JSON.stringify(data, null, 2)}</code>
          </pre>
        </div>
      }
    </>
  );
};

export default TokenTable;
