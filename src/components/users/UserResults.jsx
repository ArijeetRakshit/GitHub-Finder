import { useContext } from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/GithubContext";

const UsersResults = () => {
    const { users, paginateInfo, searchUsers , loading } = useContext(GithubContext);
    const handleClick = async(userName, pageNo) => {
      await searchUsers(userName, pageNo)
    }

    if (loading) return <Spinner />;
    return (
      <> 
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
          {users.map((user) => {
            return <UserItem key={user.id} user={user} />;
          })}
        </div> 
        {(paginateInfo) ? 
          <div className="mt-8 btn-group">
            {paginateInfo.first ? 
              <button className="btn btn-md" onClick={()=>handleClick(paginateInfo.userName, paginateInfo.first)}>
                First
              </button> 
            : null}
            {paginateInfo.prev ? 
              <button className="btn btn-md" onClick={()=>handleClick(paginateInfo.userName, paginateInfo.prev)}>
                Prev
              </button> 
            : null}
            {paginateInfo.next ? 
              <button className="btn btn-md" onClick={()=>handleClick(paginateInfo.userName, paginateInfo.next)}>
                Next
              </button> 
            : null}
            {paginateInfo.last ? 
              <button className="btn btn-md" onClick={()=>handleClick(paginateInfo.userName, paginateInfo.last)}>
                Last
              </button> 
            : null}
          </div> :
          null
        }
      </>
    );
};

export default UsersResults;