import React, { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "@clerk/react";
import DisplayMyGroups from "../components/DisplayMyGroups";
import { socket } from "../socket";
export default function MyOwnedGroups() {
    const { getToken } = useAuth();

    const [groups, setGroups] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOwnedGroups();
    }, []);

    const fetchOwnedGroups = async () => {
        try {

            const token = await getToken();
            const backendUrl = import.meta.env.VITE_BACKEND_URL;

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
                `${import.meta.env.VITE_BACKEND_URL}/groupCrud/delete/${groupId}`,
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

    const toggleLive = async (groupId, status) => {
        // socket emits for making group live and create a session 
        if (!status) {
            socket.emit('room:create', { groupId }, (response) => {
                if (response.success) {
                    setGroups((prev) =>
                        prev.map((g) =>
                            g._id === groupId
                                ? { ...g, live: true }
                                : g
                        )
                    );
                }
                else {
                    console.log(response.message)
                    alert('cant make group alive try again later ')
                }
            }

            )

        }
        else if (status) {
            const pakka = confirm('do you realy want to end this session ')
            if (pakka) {

                socket.emit('room:delete', {}, (res) => {
                    if (res.success) {
                        setGroups((prev) =>
                            prev.map((g) =>
                                g._id === groupId
                                    ? { ...g, live: false }
                                    : g
                            )
                        );
                    }
                })
            }
        }
    };

    const manageRequests = (group) => {
        console.log("Manage Requests:", group);
        // Open modal / navigate to request management page
    };

    const editGroup = (group) => {
        console.log("Edit Group:", group);
        // Open edit modal/page
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
        </div>
    );
}