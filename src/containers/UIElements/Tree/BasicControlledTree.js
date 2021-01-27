import React, { useState } from "react";
import { Tree } from "antd";

const treeData = [
  {
    title: "台北市",
    key: "0-0",
    children: [
      {
        title: "中正區",
        key: "0-0-0",
        children: [
          {
            title: "500",
            key: "0-0-0-0"
          }
        ]
      },
      {
        title: "中山區",
        key: "0-0-1",
        children: [
          {
            title: "500",
            key: "0-0-1-0"
          }
        ]
      },
      {
        title: "松山區",
        key: "0-0-2",
        children: [
          {
            title: "500",
            key: "0-0-2-0"
          }
        ]
      }
    ]
  },
  {
    title: "新北市",
    key: "0-2",
    children: [
      {
        title: "板橋區",
        key: "0-2-0-0",
        children: [
          {
            title: "550",
            key: "0-2-1-0"
          }
        ]
      }
    ]
  },
  {
    title: "桃園市",
    key: "0-3",
    children: [
      {
        title: "中壢區",
        key: "0-3-0-0",
        children: [
          {
            title: "550",
            key: "0-0-3-0"
          }
        ]
      }
    ]
  }
];

const ControlledTree = () => {
  const [expandedKeys, setExpandedKeys] = useState(["0-0-0", "0-0-1"]);
  const [checkedKeys, setCheckedKeys] = useState(["0-0-0"]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);

  const onExpand = expandedKeys => {
    console.log("onExpand", expandedKeys); // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.

    setExpandedKeys(expandedKeys);
    setAutoExpandParent(false);
  };

  const onCheck = checkedKeys => {
    console.log("onCheck", checkedKeys);
    setCheckedKeys(checkedKeys);
  };

  const onSelect = (selectedKeys, info) => {
    console.log("onSelect", info);
    setSelectedKeys(selectedKeys);
  };

  return (
    <Tree
      checkable
      onExpand={onExpand}
      expandedKeys={expandedKeys}
      autoExpandParent={autoExpandParent}
      onCheck={onCheck}
      checkedKeys={checkedKeys}
      onSelect={onSelect}
      selectedKeys={selectedKeys}
      treeData={treeData}
    />
  );
};
export default ControlledTree;
