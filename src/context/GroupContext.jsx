import { createContext, useContext, useState } from "react";

const GroupContext = createContext();

export const useGroupContext = () => useContext(GroupContext);

export const GroupProvider = ({ children }) => {
    const [groups, setGroups] = useState([]);

    const changeStatus = (groupId, status) => {
        setGroups(prev =>
            prev.map(group =>
                group._id === groupId
                    ? { ...group, live: status }
                    : group
            )
        );
    };

    const update = (groups) => {
        setGroups(groups);
    };

    return (
        <GroupContext.Provider
            value={{
                groups,
                update,
                changeStatus,
            }}
        >
            {children}
        </GroupContext.Provider>
    );
};