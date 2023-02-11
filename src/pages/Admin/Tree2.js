import React, { useState, useEffect } from "react";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { Skeleton } from "@material-ui/lab";
import { toast } from "react-toastify";
import { Avatar } from "@windmill/react-ui";
import { ArrowIcon, SearchIcon } from "../../icons";
import PageTitle from "../../components/Typography/PageTitle";
import "../../assets/css/Tree.css";
import ADMIN from "../../api/Admin";
import Pagination from '@material-ui/lab/Pagination';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Tree, TreeNode } from 'react-organizational-chart';


function TreeViewAdmin({ match }) {
  const tag = match.params.id;
  const [countResult, setCountResult] = useState(0);
  const [allPage, setAllPage] = useState(0);
  const [tree, setTree] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [searchType, setSearchType] = useState(tag === 'root' ? 1 : tag.length === 24 ? 3 : 2);
  const [keyword, setKeyword] = useState(searchType === 3 ? tag : "");
  const [loading, setLoading] = useState(true);
  const [resultsPerPage, setResultPerPage] = useState(5);
  const [page, setPage] = useState(1);
  const [currentView, setCurrentView] = useState(1);
  const [currentViewVertical, setCurrentViewVertical] = useState({});
  const [chooseView, setChooseView] = useState(2);

  useEffect(() => {
    let message = "Có vấn đề xảy ra! Vui lòng thử lại!";
    setLoading(true);

    ADMIN.tree({ keyword, page, resultsPerPage, searchType })
      .then((res) => {
        const status = res.data.status;
        console.log(res.data);
        if (status === 200) {
          setTree(res.data.data.group);
          setAllPage(res.data.data.allPage);
          setCountResult(res.data.data.countAllDocument);
          setLoading(false);
        } else {
          toast.error(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
        toast.error(message);
      });
  }, [page, submitted, resultsPerPage]);

  function onPageChange(e, page) {
    e.preventDefault();
    setCurrentView(1);
    setCurrentViewVertical({});
    setPage(page);
  }

  const handleKeyword = (event) => {
    event.preventDefault();
    setKeyword(event.target.value);
  }

  const handlePerPageChange = (event) => {
    event.preventDefault();
    setResultPerPage(event.target.value);
    setCurrentView(1);
    setCurrentViewVertical({});
    setPage(1);
  };

  const onSubmit = (e) => {
    setLoading(true);
    setPage(1);
    setCurrentView(1);
    setCurrentViewVertical({});
    setSubmitted(!submitted);
  }

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
      "&:focus > $content $label, &:hover > $content $label, &$selected > $content $label": {
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
      margin: "5px",
    },
    labelIcon: {
      width: "32px",
      height: "32px"
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

  const handleSearchTypeChange = (e) => {
    e.preventDefault();
    setSearchType(e.target.value);
  }

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
      labelChild,
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
            <LabelIcon color="#000" className={classes.labelIcon} />
            <Typography variant="body2" className={`${classes.labelText}`}>
              {labelText}
            </Typography>
            <Typography
              variant="caption"
              color="inherit"
              className={`${classes.labelInfo}`}
            >
              {`(${labelChild}${parseInt(labelPoint) >= 0
                ? ` - ${labelPoint}`
                : ""
                })`}
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

  const getTreeItemsFromData = (treeItems, key) => {
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
          labelChild={treeItemData.countChild}
          labelPoint={treeItemData.point}
          labelLevel={treeItemData.level}
          buy_package={treeItemData.buy_package}
          color={treeItemData.expired ? "red" : treeItemData.buy_package === "1" ? "gray" : treeItemData.buy_package === "2" ? "green" : treeItemData.buy_package === "3" ? "#1A56DB" : treeItemData.buy_package === "4" ? "#00CED1" : ""}
          bgColor="inherit"
          onClick={() => {
            if (chooseView === 1 && tree[key]) {
              setCurrentViewVertical(tree[key]);
              setCurrentView(2);
            }
            if (chooseView === 2) {
              setCurrentViewVertical({});
              setCurrentView(1);
            }
          }}
        >
          {treeItemData.buy_package !== "" && (
            <StyledTreeItem
              key={`${treeItemData._id}Nhom1`}
              nodeId={`${treeItemData._id}Nhom1`}
              labelText={`Nhóm 1`}
              labelIcon={ArrowIcon}
              labelChild={treeItemData.child1.countChild}
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
              labelChild={treeItemData.child2.countChild}
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
              labelChild={treeItemData.child3.countChild}
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
  }

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
  }

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
  }

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
  }

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
  }

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
    border: "3px solid #000"
  }

  const inviteCodeStyled = {
    fontSize: "16px"
  }

  const GroupView1 = ({ child1 }) => (
    <>{child1.arr.length > 0 && <TreeNode label={<div style={groupStyled}>Nhóm 1 ({child1.countChild} - {child1.sumPoint})</div>}>
      {child1.arr && <TreeNodeView data={child1.arr} />}
    </TreeNode>}</>
  );
  const GroupView2 = ({ child2 }) => (
    <>{child2.arr.length > 0 && <TreeNode label={<div style={groupStyled}>Nhóm 2 ({child2.countChild} - {child2.sumPoint})</div>}>
      {child2.arr && <TreeNodeView data={child2.arr} />}
    </TreeNode>}</>
  );
  const GroupView3 = ({ child3 }) => (
    <>{child3.arr.length > 0 && <TreeNode label={<div style={groupStyled}>Nhóm 3 ({child3.countChild} - {child3.sumPoint})</div>}>
      {child3.arr && <TreeNodeView data={child3.arr} />}
    </TreeNode>}</>
  );
  const TreeViewAll = ({ data }) => (
    data.map((user) => <Tree
      key={user._id}
      lineWidth={'4px'}
      lineColor={'black'}
      lineBorderRadius={'10px'}
      label={<div style={user.expired ? nameStyled5 : user.buy_package === "1" ? nameStyled1 : user.buy_package === "2" ? nameStyled2 : user.buy_package === "3" ? nameStyled3 : user.buy_package === "4" ? nameStyled4 : nameStyled5}><div>{user.full_name} ({user.countChild} - {user.point})</div>
        <div style={inviteCodeStyled}>{user._id}</div>
      </div>}
    >
      <GroupView1 child1={user.child1} />
      <GroupView2 child2={user.child2} />
      <GroupView3 child3={user.child3} />
    </Tree>
    )
  );

  const TreeNodeView = ({ data }) => (
    data.map((user) => <TreeNode key={user._id} label={<div style={user.expired ? nameStyled5 : user.buy_package === "1" ? nameStyled1 : user.buy_package === "2" ? nameStyled2 : user.buy_package === "3" ? nameStyled3 : user.buy_package === "4" ? nameStyled4 : nameStyled5}><div>{user.full_name} ({user.countChild} - {user.point})</div>
      <div style={inviteCodeStyled}>{user._id}</div>
    </div>}>
      <GroupView1 child1={user.child1} />
      <GroupView2 child2={user.child2} />
      <GroupView3 child3={user.child3} />
    </TreeNode>
    )
  );

  return (
    <>
      <PageTitle>Cây Hệ Thống</PageTitle>

      <div className="flex justify-between items-center">

        <div className="my-4 flex sm:flex-row flex-col">
          <div className="flex flex-row mb-1 sm:mb-0">
            <div className="relative">
              <select
                onChange={handlePerPageChange}
                defaultValue={resultsPerPage}
                className="appearance-none h-full rounded-l border block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                <option value={5} defaultValue={resultsPerPage === 5}>5</option>
                <option value={10} defaultValue={resultsPerPage === 10}>10</option>
                <option value={20} defaultValue={resultsPerPage === 20}>20</option>
              </select>
              <div
                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
            <div className="relative">
              <select
                onChange={handleSearchTypeChange}
                defaultValue={searchType}
                className="appearance-none h-full rounded-r border-t sm:rounded-r-none sm:border-r-0 border-r border-b block w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:border-l focus:border-r focus:bg-white focus:border-gray-500">
                <option value={1} defaultValue={searchType === 1}>Cấp dưới Công Ty</option>
                <option value={2} defaultValue={searchType === 2}>Theo Tên</option>
                <option value={3} defaultValue={searchType === 3}>Theo Mã Giới Thiệu</option>
              </select>
              <div
                className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                </svg>
              </div>
            </div>
          </div>
          <div className="block relative">
            <>
              <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                  <path
                    d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                  </path>
                </svg>
              </span>
              <input placeholder="Nhập từ khóa tìm kiếm"
                onChange={handleKeyword}
                value={keyword}
                disabled={searchType == '1'}
                className={`h-full min-w-40 border-l appearance-none rounded-r rounded-l sm:rounded-l-none border-t border-r border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-md placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none ${searchType == "1" && "opacity-50"}`} />
            </>
          </div>
          <button onClick={onSubmit} type="button" className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 mx-2 rounded-lg text-sm text-white bg-red-600 border border-transparent active:bg-red-500 hover:bg-red-500 focus:shadow-outline-red ">
            <SearchIcon className="w-4 h-4 mr-3" aria-hidden="true" />
            Tìm kiếm</button>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center">
            {
              chooseView === 1 &&
              <button onClick={() => setChooseView(2)} type="button" className="mr-2 align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-600 border border-transparent active:bg-green-600 hover:bg-green-700 focus:shadow-outline-green">
                Xem dạng dọc</button>
            }
            {
              chooseView === 2 &&
              <button onClick={() => {
                setChooseView(1);
              }
              } type="button" className="align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-600 border border-transparent active:bg-green-600 hover:bg-green-700 focus:shadow-outline-green ">
                Xem dạng ngang</button>
            }
          </div>
          {
            currentView === 2 &&
            <button onClick={() => {
              setCurrentView(1);
              setCurrentViewVertical({});
            }} type="button" className="mr-2 align-bottom inline-flex items-center justify-center cursor-pointer leading-5 transition-colors duration-150 font-medium focus:outline-none px-4 py-2 rounded-lg text-sm text-white bg-green-600 border border-transparent active:bg-green-600 hover:bg-green-700 focus:shadow-outline-green">
              Trở về</button>
          }
        </div>
      </div>

      <div className="tree p-6 border-t border-l border-r rounded-tl rounded-tr bg-white">
        {loading ? (
          <>
            <div className="mt-1">
              <Skeleton variant="rect" width="100%" height={40} count={5} />
            </div>
            <div className="mt-1">
              <Skeleton variant="rect" width="100%" height={40} count={5} />
            </div>
            <div className="mt-1">
              <Skeleton variant="rect" width="100%" height={40} count={5} />
            </div>
            <div className="mt-1">
              <Skeleton variant="rect" width="100%" height={40} count={5} />
            </div>
            <div className="mt-1">
              <Skeleton variant="rect" width="100%" height={40} count={5} />
            </div>
          </>
        ) : (
          <>
            {
              currentView === 1 &&
              <TreeView
                className={useStyles.root}
                defaultExpanded={["1"]}
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                defaultEndIcon={<div style={{ width: 24 }} />}
              >
                {tree.map((item, key) => getTreeItemsFromData(item, key))}
              </TreeView>
            }
            {currentView === 2 &&
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
                        <button className="px-4 py-1 bg-white rounded-lg text-black mx-1 flex justify-center items-center font-bold focus:outline-none" onClick={() => zoomIn()}>Phóng to</button>
                        <button className="px-4 py-1 bg-white rounded-lg text-black mx-1 flex justify-center items-center font-bold focus:outline-none" onClick={() => zoomOut()}>Thu nhỏ</button>
                        <button className="px-4 py-1 bg-white rounded-lg text-black mx-1 flex justify-center items-center font-bold focus:outline-none" onClick={() => resetTransform()}>Reset</button>
                      </div>
                      <TransformComponent>
                        <TreeViewAll data={currentViewVertical} />
                      </TransformComponent>
                    </React.Fragment>
                  )}
                </TransformWrapper>
              </div>
            }
          </>
        )}
      </div>


      {/* PAGINATION */}
      <div className="px-4 py-3 border-b border-l border-r rounded-bl rounded-br bg-gray-100 text-gray-500">
        {
          loading ?
            <div className=""><Skeleton variant="rect" width="100%" height={50} count={resultsPerPage} /></div>
            :
            tree.length !== 0 ?
              <div className="flex justify-between items-center">
                <Pagination count={allPage} page={page} onChange={onPageChange} color="primary" />
                <div>Có <span className="text-xl mx-1 text-gray-700">{countResult}</span> kết quả</div>
              </div>
              :
              <div className="text-md text-gray-400 text-center">không có dữ liệu</div>
        }
      </div>
      {/* PAGINATION */}

      <div className="px-6 pt-6 my-8">
        <h2 className="text-xl">* <strong>Chú thích</strong> : </h2>
        <ul>
          <li className="my-2"><span role="img" aria-label="emoji">❗</span> Tên người dùng màu <span className="text-blue-800 font-bold">xanh dương</span> : Gói doanh nghiệp A</li>
          <li className="my-2"><span role="img" aria-label="emoji">❗</span> Tên người dùng màu <span className="text-cyan-default font-bold">xanh ngọc</span> : Gói doanh nghiệp B</li>
          <li className="my-2"><span role="img" aria-label="emoji">❗</span> Tên người dùng màu <span className="text-green-600 font-bold">xanh lá cây</span> : Gói gia đình</li>
          <li className="my-2"><span role="img" aria-label="emoji">❗</span> Tên người dùng màu <span className="text-gray-600 font-bold">xám</span> : Gói cá nhân</li>
          <li className="my-2"><span role="img" aria-label="emoji">❗</span> Tên người dùng màu <span className="text-red-600 font-bold">đỏ</span> : Tài khoản hết hạn</li>
          <li className="my-2"><span role="img" aria-label="emoji">❗</span> X (Số cấp dưới - Y số điểm)</li>
        </ul>
      </div>
    </>
  );
}

export default TreeViewAdmin;
