import React, { useState } from "react";
import axios from "axios";
import GroupSearch from "../components/GroupSearchFilter";
import GroupList from "../components/GroupSearchDisplay";
import { useAuth } from "@clerk/react";
import { useNavigate } from "react-router-dom";

export default function SearchGroupPage() {
  const [query, setQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("name");
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getToken } = useAuth();
  const navigate = useNavigate();


  const backendUrl = import.meta.env.VITE_BACKEND_URL;

  const changeFilter = (filter) => {
    setLoading(false);
    setActiveFilter(filter);
    setQuery("");
    setGroups([]);
  };

  const searchLiveGroups = async (filter) => {
    setActiveFilter(filter);
    setLoading(true);

    const res = await axios.get(`${backendUrl}/group/search/live`);
    setGroups(res.data.data || []);
    setLoading(false);
  };

  const searchByMode = async () => {
    setLoading(true);
    const res = await axios.get(
      `${backendUrl}/group/search/mode/${query}`
    );
    setGroups(res.data.data || []);
    setLoading(false);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);


      const res = await axios.get(
        `${backendUrl}/group/search/name/${query}`
      );

      setGroups(res.data.data || []);

    } catch (error) {
      console.error(error.message)
    }
    finally {
      setLoading(false)
    }
  };

  const handleModeSelect = (mode) => setQuery(mode);


  const handleToGroup = async (groupId) => {
    try {
      console.log(groupId)
      const token = await getToken();
      if (!token) {
        navigate("/login");
        return;
      }
      const response = await axios.post(
        `${backendUrl}/group/join`,
        { groupId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }

      );
      console.log(response.data)
      alert(response.data.data.message)

    } catch (error) {
      console.log(error.message)
    }

  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white !p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold !mb-8 text-red-400">
          Search Groups
        </h1>

        <GroupSearch
          query={query}
          setQuery={setQuery}
          activeFilter={activeFilter}
          changeFilter={changeFilter}
          searchLiveGroups={searchLiveGroups}
          searchByMode={searchByMode}
          handleSearch={handleSearch}
          handleModeSelect={handleModeSelect}
          loading={loading}
        />

        <GroupList
          groups={groups}
          loading={loading}
          handleToGroup={handleToGroup}
        />
      </div>
    </div>
  );
}