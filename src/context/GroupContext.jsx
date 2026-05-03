import { createContext, useContext, useState } from "react";

const GroupContext = createContext();

export const useGroup = () => useContext(GroupContext);

export const GroupProvider = ({ children }) => {
    const [liveGroup, setLiveGroup] = useState({
        sessionId: "",
        name: ""
    });

    const [groups, setGroups] = useState([]);

    const updateLiveGroup = ({ sessionId, name }) => {
        setLiveGroup({ sessionId, name });
    };

    const clearLiveGroup = () => {
        setLiveGroup({
            sessionId: "",
            name: ""
        });
    };

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
                liveGroup,
                update,
                changeStatus,
                updateLiveGroup,
                clearLiveGroup,
            }}
        >
            {children}
        </GroupContext.Provider>
    );
};