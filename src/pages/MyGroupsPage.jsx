import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/react";
import DisplayMyGroups from "../components/DisplayMyGroups";
import { socket } from "../socket";
import AdminRequestPanel from "../components/AdminRequestPanel";
import { useSong } from "../context/SongContext";
import { useGroup } from "../context/GroupContext";
export default function MyOwnedGroups() {
    const { getToken } = useAuth();
    const { inGroupUpdateQue, reset, isInGroup, setIsInGroup ,inGroupUpdateCurrentIndex} = useSong();
    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [showPanel, setShowPanel] = useState(false);
    const { updateLiveGroup } = useGroup()
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    const [requestLoading, setRequestLoading] = useState({
        userId: null,
        action: null,
    });

    useEffect(() => {
        fetchOwnedGroups();
    }, []);

    const fetchOwnedGroups = async () => {
        try {

            const token = await getToken();

            const res = await axios.get(
                `${backendUrl}/groupCrud/getOwedGruops`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(res.data)
            setGroups(res.data.data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteGroup = async (groupId) => {
        try {
            const token = await getToken();
            await axios.delete(
                `${backendUrl}/groupCrud/delete/${groupId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setGroups((prev) => prev.filter((g) => g._id !== groupId));
        } catch (err) {
            console.error(err);
        }
    };

    const toggleLive = async (groupId, status, group) => {
        if (!status) {
            socket.emit("room:create", { groupId }, (response) => {
                if (!response.success) {
                    alert(response.message || "Couldn't start session");
                    return;
                }

                setGroups(prev =>
                    prev.map(g =>
                        g._id === groupId
                            ? { ...g, live: true }
                            : g
                    )
                );

                setIsInGroup(true);
                console.log(response)
                const newObject = {sessionId :response?.data?.session?._id , name : group.name , admin : true }
                console.log(newObject)
                updateLiveGroup(newObject);
                inGroupUpdateQue(response.queue || []);
                inGroupUpdateCurrentIndex(response.currentIndex || 0);
            });

            return;
        }

        const confirmed = confirm("Do you really want to end this session?");
        if (!confirmed) return;

        socket.emit("room:delete", {}, (response) => {
            if (!response.success) {
                alert(response.message || "Failed to end session");
                return;
            }

            setGroups(prev =>
                prev.map(g =>
                    g._id === groupId
                        ? { ...g, live: false }
                        : g
                )
            );
            reset(false);
        });
    };

    const manageRequests = async (group) => {
        try {
            const token = await getToken();
            const response = await axios.get(
                `${backendUrl}/groupCrud/getRequest?groupId=${group._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            console.log(response.data.data)
            setSelectedGroup(response.data.data);
            setShowPanel(true);

        } catch (error) {
            console.log(error)
        }

    };

    const editGroup = (group) => {
        console.log("Edit Group:", group);
        // Open edit modal/page
    };

    const handleAccept = async (req) => {
        try {
            setRequestLoading({
                userId: req._id,
                action: "accept",
            });

            const token = await getToken();

            await axios.get(
                `${backendUrl}/groupCrud/acceptRequest?groupId=${selectedGroup._id}&userId=${req._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setSelectedGroup(prev => ({
                ...prev,
                requests: prev.requests.filter(
                    request => request._id !== req._id
                )
            }));

            set
        } catch (error) {
            console.log(error);
        } finally {
            setRequestLoading({
                userId: null,
                action: null,
            });
        }
    };

    const handleReject = (req) => {
        console.log("reject:", req);
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                Loading Owned Groups...
            </div>
        );
    }

    return (
        <div className="min-h-screen text-white !p-6">
            <div className="max-w-7xl !mx-auto">
                <h1 className="text-3xl font-bold !mb-8">My Owned Groups</h1>

                {groups.length === 0 ? (
                    <div className="text-zinc-400 text-center text-lg">
                        You don't own any groups.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 !gap-6">
                        {groups.map((group) => (
                            <DisplayMyGroups
                                key={group._id}
                                group={group}
                                onDelete={deleteGroup}
                                onToggleLive={toggleLive}
                                onManageRequests={manageRequests}
                                onEdit={editGroup}
                            />
                        ))}
                    </div>
                )}
            </div>

            <AdminRequestPanel
                isOpen={showPanel}
                onClose={() => setShowPanel(false)}
                requests={selectedGroup?.requests || []}
                onAccept={handleAccept}
                onReject={handleReject}
                requestLoading={requestLoading}
            />
        </div>


    );
}