import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Skeleton } from "@material-ui/lab";
import TreeItem from "@material-ui/lab/TreeItem";
import TreeView from "@material-ui/lab/TreeView";
import { Avatar } from "@windmill/react-ui";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Tree, TreeNode } from "react-organizational-chart";
import { toast } from "react-toastify";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import CLIENT from "../api/Client";
import "../assets/css/Tree.css";
import PageTitle from "../components/Typography/PageTitle";
import { ArrowIcon } from "../icons";

function TreeHorizon() {
  const { t, i18n } = useTranslation();
  const id = JSON.parse(localStorage.getItem("user")).user.id;
  const [loadingTree, setLoadingTree] = useState(true);
  const [loadingTable, setLoadingTable] = useState(true);
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [childs, setChilds] = useState([]);
  const [currentSearch, setCurrentSearch] = useState(id);
  const [showSuggest, setShowSuggest] = useState(false);
  const [currentView, setCurrentView] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [allPage, setAllPage] = useState(0);
  const [loadTree, setLoadTree] = useState(true);
  const [searchingID, setSearchingID] = useState([id]);

  // pagination setup
  const resultsPerPage = 5;
  const [totalResults, setTotalResults] = useState(0);

  // pagination change control
  function onPageChange(e, page) {
    e.preventDefault();
    setPage(page);
  }

  const onSubmit = (e) => {
    setLoadTree(false);
    setSubmitted(!submitted);
  };

  const handleKeyword = (event) => {
    setKeyword(event.target.value);
  };

  const nameStyled1 = {
    backgroundColor: "#4c4f52",
    color: "#fff",
    fontWeight: "500",
    padding: "7px 10px",
    fontSize: "22px",
    margin: "5px auto",
    width: "fit-content",
    borderRadius: "8px",
    display: "inline-block",
  };

  const nameStyled2 = {
    backgroundColor: "#059669",
    color: "#fff",
    fontWeight: "500",
    padding: "7px 10px",
    fontSize: "22px",
    margin: "5px auto",
    width: "fit-content",
    borderRadius: "8px",
    display: "inline-block",
  };

  const nameStyled3 = {
    backgroundColor: "#1E40AF",
    color: "#fff",
    fontWeight: "500",
    padding: "7px 10px",
    fontSize: "22px",
    margin: "5px auto",
    width: "fit-content",
    borderRadius: "8px",
    display: "inline-block",
  };

  const nameStyled4 = {
    backgroundColor: "#00CED1",
    color: "#fff",
    fontWeight: "500",
    padding: "7px 10px",
    fontSize: "22px",
    margin: "5px auto",
    width: "fit-content",
    display: "inline-block",
    borderRadius: "8px",
  };

  const nameStyled5 = {
    backgroundColor: "#DC2626",
    color: "#fff",
    fontWeight: "500",
    padding: "7px 10px",
    fontSize: "22px",
    margin: "5px auto",
    width: "fit-content",
    display: "inline-block",
    borderRadius: "8px",
  };

  const groupStyled = {
    backgroundColor: "#fff",
    color: "#000",
    fontWeight: "500",
    padding: "7px 10px",
    fontSize: "20px",
    margin: "5px auto",
    width: "fit-content",
    borderRadius: "8px",
    display: "inline-block",
    border: "3px solid #000",
  };

  const inviteCodeStyled = {
    fontSize: "16px",
  };

  const GroupView1 = ({ child1 }) => (
    <>
      {child1.arr.length > 0 && (
        <TreeNode
          label={<div style={groupStyled}>Nhóm 1 ({child1.sumPoint})</div>}
        >
          {child1.arr && <TreeNodeView data={child1.arr} />}
        </TreeNode>
      )}
    </>
  );
  const GroupView2 = ({ child2 }) => (
    <>
      {child2.arr.length > 0 && (
        <TreeNode
          label={<div style={groupStyled}>Nhóm 2 ({child2.sumPoint})</div>}
        >
          {child2.arr && <TreeNodeView data={child2.arr} />}
        </TreeNode>
      )}
    </>
  );
  const GroupView3 = ({ child3 }) => (
    <>
      {child3.arr.length > 0 && (
        <TreeNode
          label={<div style={groupStyled}>Nhóm 3 ({child3.sumPoint})</div>}
        >
          {child3.arr && <TreeNodeView data={child3.arr} />}
        </TreeNode>
      )}
    </>
  );
  const TreeViewAll = ({ data }) =>
    data.map((user) => (
      <Tree
        key={user._id}
        lineWidth={"4px"}
        lineColor={"black"}
        lineBorderRadius={"10px"}
        label={
          <div
            style={
              user.expired
                ? nameStyled5
                : user.buy_package === "1"
                ? nameStyled1
                : user.buy_package === "2"
                ? nameStyled2
                : user.buy_package === "3"
                ? nameStyled3
                : user.buy_package === "4"
                ? nameStyled4
                : nameStyled5
            }
          >
            <div>
              {user.full_name} ({user.point})
            </div>
            <div style={inviteCodeStyled}>{user._id}</div>
          </div>
        }
      >
        <GroupView1 child1={user.child1} />
        <GroupView2 child2={user.child2} />
        <GroupView3 child3={user.child3} />
      </Tree>
    ));

  const TreeNodeView = ({ data }) =>
    data.map((user) => (
      <TreeNode
        key={user._id}
        label={
          <div
            onClick={() => {
              if (user._id !== id) {
                changeTreeArr(user._id);
              }
            }}
            style={
              user.expired
                ? nameStyled5
                : user.buy_package === "1"
                ? nameStyled1
                : user.buy_package === "2"
                ? nameStyled2
                : user.buy_package === "3"
                ? nameStyled3
                : user.buy_package === "4"
                ? nameStyled4
                : nameStyled5
            }
          >
            <div>
              {user.full_name} ({user.point})
            </div>
            <div style={inviteCodeStyled}>{user._id}</div>
          </div>
        }
      >
        <GroupView1 child1={user.child1} />
        <GroupView2 child2={user.child2} />
        <GroupView3 child3={user.child3} />
      </TreeNode>
    ));

  useEffect(() => {
    document.title = "Ameritec || " + t("Cây hệ thống");
    let message = "Có vấn đề xảy ra! Vui lòng thử lại!";
    CLIENT.tree({
      user_id: id,
      id: currentSearch,
      loadTree,
    })
      .then((res) => {
        const status = res.data.status;
        if (status === 200) {
          if (res.data.data.loadTree) {
            setData(res.data.data.group);
          }
          setLoadingTree(false);
          setLoadTree(false);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(message);
      });
  }, [loadTree]);

  // useEffect(() => {
  //   let message = "Có vấn đề xảy ra! Vui lòng thử lại!";

  //   CLIENT.getChildInTree({
  //     user_id: id,
  //     id: currentSearch,
  //     page,
  //     resultsPerPage,
  //     keyword,
  //   })
  //     .then((res) => {
  //       const status = res.data.status;
  //       if (status === 200) {
  //         setChilds(res.data.data.listChild);
  //         setTotalResults(res.data.data.totalResults);
  //         setAllPage(res.data.data.allPage);
  //         setLoadingTable(false);
  //       } else {
  //         toast.error(res.data.message);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       toast.error(message);
  //     });
  // }, [page, currentSearch, submitted]);

  async function changeTreeArr(id) {
    if (searchingID.findIndex((ele) => ele === id) === -1) {
      searchingID.push(id);
      await CLIENT.tree({
        user_id: id,
        id,
        loadTree: true,
      })
        .then((res) => {
          const status = res.data.status;
          if (status === 200) {
            if (res.data.data.loadTree) {
              let cloneData = [...data];
              findAndChange(id, res.data.data.group, cloneData);
              setData(cloneData);
            }
            setLoadingTree(false);
            setLoadTree(false);
          } else {
            toast.error(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      let index = searchingID.findIndex((ele) => ele === id);
      let remove = searchingID.splice(index, 1);
      setSearchingID([...searchingID]);
    }
  }

  function findAndChange(search, arrToInsert, arr) {
    arr.map((val, i) => {
      if (val._id === search) {
        arr[i] = { ...arrToInsert[0] };
        return;
      } else {
        if (val.child1.arr.length > 0) {
          findAndChange(search, arrToInsert, val.child1.arr);
        }
        if (val.child2.arr.length > 0) {
          findAndChange(search, arrToInsert, val.child2.arr);
        }
        if (val.child3.arr.length > 0) {
          findAndChange(search, arrToInsert, val.child3.arr);
        }
      }
    });

    // var flg = true;

    // if (!Array.isArray(arr.child1.arr)) {
    //   let index = arr.child1.arr.findIndex(ele => ele._id === search);
    //   if (index > -1) {
    //     flg = false;
    //     console.log('index child 1', index);
    //     arr.child1.arr[index] = { ...arrToInsert };
    //   }
    // } else if (!Array.isArray(arr.child2.arr)) {
    //   let index = arr.child2.arr.findIndex(ele => ele._id === search);
    //   if (index > -1) {
    //     flg = false;
    //     console.log('index child 2', index);
    //     arr.child2.arr[index] = { ...arrToInsert };
    //   }
    // } else if (!Array.isArray(arr.child3.arr)) {
    //   let index = arr.child3.arr.findIndex(ele => ele._id === search);
    //   if (index > -1) {
    //     flg = false;
    //     console.log('index child 3', index);
    //     arr.child3.arr[index] = { ...arrToInsert };
    //   }
    // }

    // if(flg) {
    //   findAndChange(search, arrToInsert, arr);
    // }
  }

  const getTreeItemsFromData = (treeItems) => {
    return treeItems.map((treeItemData) => {
      const avatar = () => {
        return (
          <Avatar
            key={treeItemData._id}
            className="align-middle w-8 h-8"
            src={treeItemData.avatar}
            alt=""
            aria-hidden="true"
          />
        );
      };

      return (
        <StyledTreeItem
          key={treeItemData._id}
          nodeId={treeItemData._id}
          labelText={treeItemData.full_name.toUpperCase()}
          labelIcon={avatar}
          // labelChild={treeItemData.countChild}
          labelPoint={treeItemData.point}
          labelLevel={treeItemData.level}
          buy_package={treeItemData.buy_package}
          color={
            treeItemData.expired
              ? "red"
              : treeItemData.buy_package === "1"
              ? "gray"
              : treeItemData.buy_package === "2"
              ? "green"
              : treeItemData.buy_package === "3"
              ? "#1A56DB"
              : treeItemData.buy_package === "4"
              ? "#00CED1"
              : ""
          }
          bgColor="inherit"
          onClick={() => {
            if (treeItemData._id !== id) {
              changeTreeArr(treeItemData._id);
            }
          }}
        >
          {treeItemData.buy_package !== "" && (
            <StyledTreeItem
              key={`${treeItemData._id}Nhom1`}
              nodeId={`${treeItemData._id}Nhom1`}
              labelText={`Nhóm 1`}
              labelIcon={ArrowIcon}
              // labelChild={treeItemData.child1.countChild}
              labelPoint={treeItemData.child1.sumPoint}
              color="#000"
              bgColor="inherit"
              children={getTreeItemsFromData(treeItemData.child1.arr)}
            />
          )}
          {treeItemData.buy_package !== "" && (
            <StyledTreeItem
              key={`${treeItemData._id}Nhom2`}
              nodeId={`${treeItemData._id}Nhom2`}
              labelText={`Nhóm 2`}
              labelIcon={ArrowIcon}
              // labelChild={treeItemData.child2.countChild}
              labelPoint={treeItemData.child2.sumPoint}
              color="#000"
              bgColor="inherit"
              children={getTreeItemsFromData(treeItemData.child2.arr)}
            />
          )}
          {treeItemData.buy_package !== "" && (
            <StyledTreeItem
              key={`${treeItemData._id}Nhom3`}
              nodeId={`${treeItemData._id}Nhom3`}
              labelText={`Nhóm 3`}
              labelIcon={ArrowIcon}
              // labelChild={treeItemData.child3.countChild}
              labelPoint={treeItemData.child3.sumPoint}
              color="#000"
              bgColor="inherit"
              children={getTreeItemsFromData(treeItemData.child3.arr)}
            />
          )}
        </StyledTreeItem>
      );
    });
  };

  const useTreeItemStyles = makeStyles((theme) => ({
    root: {
      color: theme.palette.text.secondary,
      "&:hover > $content": {
        backgroundColor: theme.palette.action.hover,
      },
      "&:focus > $content, &$selected > $content": {
        backgroundColor: `var(--tree-view-bg-color, ${theme.palette.grey[400]})`,
        color: "var(--tree-view-color)",
      },
      "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label":
        {
          backgroundColor: "transparent",
        },
    },
    content: {
      // color: '#fff',
      fontWeight: theme.typography.fontWeightMedium,
      "$expanded > &": {
        fontWeight: theme.typography.fontWeightRegular,
      },
    },
    group: {
      marginLeft: 7,
      paddingLeft: 10,
      borderLeft: "2px dashed #ccc",
    },
    expanded: {},
    selected: {},
    label: {},
    labelRoot: {
      display: "flex",
      alignItems: "center",
      margin: "10px 10px 10px 0",
    },
    labelIcon: {
      width: "32px",
      height: "32px",
    },
    labelText: {
      fontSize: "15px",
      marginLeft: "10px",
      fontWeight: "bold",
      color: "inherit",
    },
    labelInfo: {
      fontSize: "13px",
      marginLeft: "6px",
      color: "red",
    },
  }));

  const useStyles = makeStyles({
    root: {
      height: 264,
      flexGrow: 1,
      maxWidth: 400,
    },
  });

  const StyledTreeItem = (props) => {
    const classes = useTreeItemStyles();
    const {
      labelText,
      labelIcon: LabelIcon,
      buy_package,
      // labelChild,
      labelPoint,
      labelLevel,
      group,
      color,
      bgColor,
      ...other
    } = props;
    return (
      <TreeItem
        label={
          <div className={classes.labelRoot}>
            <LabelIcon color="#000" className={`${classes.labelIcon} `} />
            <Typography variant="body2" className={`${classes.labelText}`}>
              {labelText}
            </Typography>
            <Typography
              variant="caption"
              color="inherit"
              className={`${classes.labelInfo}`}
            >
              {/* {`(${labelChild}${parseInt(labelPoint) >= 0 && buy_package !== "1"
                ? ` - ${labelPoint}`
                : ""
                })`} */}
              {`(${labelPoint})`}
            </Typography>
          </div>
        }
        style={{
          color: color,
          backgroundColor: bgColor,
        }}
        classes={{
          // root: classes.root,
          // content: classes.content,
          expanded: classes.expanded,
          selected: classes.selected,
          group: classes.group,
          label: classes.label,
        }}
        {...other}
      />
    );
  };

  return (
    <>
      <div className="flex justify-between">
        <PageTitle>{t("Cây hệ thống")}</PageTitle>
      </div>
      <div className="mb-4">
        <div className={`flex justify-between items-center`}>
          <div className="flex items-center">
            {currentView === 2 && (
              <button
                onClick={() => setCurrentView(1)}
                type="button"
                className="mr-2 align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-600 border border-transparent active:bg-green-600 hover:bg-green-700 focus:shadow-outline-green"
              >
                {t("Xem dạng dọc")}
              </button>
            )}
            {currentView === 1 && (
              <button
                onClick={() => {
                  setCurrentView(2);
                }}
                type="button"
                className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-600 border border-transparent active:bg-green-600 hover:bg-green-700 focus:shadow-outline-green "
              >
                {t("Xem dạng ngang")}
              </button>
            )}
          </div>

          <div className="flex items-center">
            {!showSuggest && (
              <button
                onClick={() => setShowSuggest(true)}
                type="button"
                className="mr-2 align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-600 border border-transparent active:bg-green-600 hover:bg-green-700 focus:shadow-outline-green"
              >
                {t("Xem hệ thống CTV của Bạn")}
              </button>
            )}
            {showSuggest && (
              <button
                onClick={() => {
                  setShowSuggest(false);
                  setCurrentSearch(id);
                  setLoadTree(true);
                }}
                type="button"
                className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-orange-600 border border-transparent active:bg-orange-600 hover:bg-orange-700 focus:shadow-outline-orange "
              >
                {t("Trở về cây chính")}
              </button>
            )}
          </div>
        </div>
      </div>
      {loadingTree ? (
        <Skeleton variant="rect" width="100%" height={100} animation="wave" />
      ) : (
        <>
          {currentView === 1 && (
            <div className="p-6 bg-gray-100 rounded-lg w-full overflow-auto">
              <div className="w-full">
                <TreeView
                  className={useStyles.root}
                  defaultExpanded={["1"]}
                  defaultCollapseIcon={<ExpandMoreIcon />}
                  defaultExpandIcon={<ChevronRightIcon />}
                  defaultEndIcon={<div style={{ width: 24 }} />}
                >
                  {getTreeItemsFromData(data)}
                </TreeView>
              </div>
            </div>
          )}
          {currentView === 2 && (
            <div className="p-6 bg-gray-100 rounded-lg w-full overflow-hidden">
              <TransformWrapper
                initialScale={0.5}
                minScale={0.1}
                maxScale={8}
                centerOnInit={false}
                initialPositionX={50}
                initialPositionY={50}
                defaultPositionX={50}
                defaultPositionY={50}
              >
                {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
                  <React.Fragment>
                    <div className="tools flex items-center">
                      <button
                        className="px-4 py-1 bg-white rounded-lg text-black mx-1 flex justify-center items-center font-bold focus:outline-none"
                        onClick={() => zoomIn()}
                      >
                        {t("Phóng to")}
                      </button>
                      <button
                        className="px-4 py-1 bg-white rounded-lg text-black mx-1 flex justify-center items-center font-bold focus:outline-none"
                        onClick={() => zoomOut()}
                      >
                        {t("Thu nhỏ")}
                      </button>
                      <button
                        className="px-4 py-1 bg-white rounded-lg text-black mx-1 flex justify-center items-center font-bold focus:outline-none"
                        onClick={() => resetTransform()}
                      >
                        Reset
                      </button>
                    </div>
                    <TransformComponent>
                      <TreeViewAll data={data} />
                    </TransformComponent>
                  </React.Fragment>
                )}
              </TransformWrapper>
            </div>
          )}
        </>
      )}

      <div className="px-6 pt-6 mt-8 mb-20">
        <h2 className="text-xl">
          * <strong>{t("Chú thích")}</strong> :{" "}
        </h2>
        <ul>
          <li className="my-2">
            <span role="img" aria-label="emoji">
              ❗
            </span>{" "}
            {t("Tên người dùng màu")}{" "}
            <span className="text-blue-800 font-bold">{t("xanh dương")}</span> :{" "}
            {t("Gói Doanh Nghiệp")} A
          </li>
          <li className="my-2">
            <span role="img" aria-label="emoji">
              ❗
            </span>{" "}
            {t("Tên người dùng màu")}{" "}
            <span className="text-cyan-default font-bold">
              {t("xanh ngọc")}
            </span>{" "}
            : {t("Gói Doanh Nghiệp")} B
          </li>
          <li className="my-2">
            <span role="img" aria-label="emoji">
              ❗
            </span>{" "}
            {t("Tên người dùng màu")}{" "}
            <span className="text-green-600 font-bold">{t("xanh lá cây")}</span>{" "}
            : {t("Gói Gia Đình")}
          </li>
          <li className="my-2">
            <span role="img" aria-label="emoji">
              ❗
            </span>{" "}
            {t("Tên người dùng màu")}{" "}
            <span className="text-gray-600 font-bold">{t("xám")}</span> :{" "}
            {t("Gói Cá Nhân")}
          </li>
          <li className="my-2">
            <span role="img" aria-label="emoji">
              ❗
            </span>{" "}
            {t("Tên người dùng màu")}{" "}
            <span className="text-red-600 font-bold">{t("đỏ")}</span> :{" "}
            {t("Tài khoản hết hạn")}
          </li>
          <li className="my-2">
            <span role="img" aria-label="emoji">
              ❗
            </span>{" "}
            {t("X (Số điểm)")}
          </li>
        </ul>
      </div>
    </>
  );
}

export default TreeHorizon;
