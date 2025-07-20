import React, { useState, useEffect } from 'react';
import supabase from "../SupabaseClient.js";
import HomePage from "../HomePage/HomePage.jsx";
import './friends.css';
import { ArrowLeft } from "lucide-react"; // Importing the back arrow icon

export default function Friends() {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [friends, setFriends] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserProfile, setCurrentUserProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [selectedProfile, setSelectedProfile] = useState(null);
    const [showAddFriend, setShowAddFriend] = useState(false);
    const [searchUsername, setSearchUsername] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);

    useEffect(() => {
        getCurrentUser();
    }, []);

    useEffect(() => {
        if (currentUser && currentUserProfile) {
            fetchFriends();
            fetchPendingRequests();
        }
    }, [currentUser, currentUserProfile]);

    const getCurrentUser = async () => {
        try {
            const { data: { user }, error } = await supabase.auth.getUser();
            if (error) throw error;
            setCurrentUser(user);

            // Get the current user's profile
            if (user) {
                const { data: profile, error: profileError } = await supabase
                    .from('profiles')
                    .select('*')
                    .eq('user_id', user.id)
                    .single();

                if (profileError) {
                    console.error('Error fetching user profile:', profileError);
                    // Create a fallback profile if none exists
                    setCurrentUserProfile({
                        user_id: user.id,
                        username: user.email?.split('@')[0] || 'User',
                        level: 1
                    });
                } else {
                    setCurrentUserProfile(profile);
                }
            }
        } catch (error) {
            console.error('Error getting current user:', error);
        }
    };

    const fetchFriends = async () => {
        if (!currentUser || !currentUserProfile) return;

        setLoading(true);
        try {
            // Get connections where current user profile is either user_id_one or user_id_two
            const { data: connections, error: connectionsError } = await supabase
                .from('connections')
                .select('*')
                .or(`user_id_one.eq.${currentUser.id},user_id_two.eq.${currentUser.id}`);

            if (connectionsError) throw connectionsError;

            // Get friend user_ids
            const friendUserIds = connections.map(conn =>
                conn.user_id_one === currentUser.id ? conn.user_id_two : conn.user_id_one
            );

            if (friendUserIds.length === 0) {
                setFriends([]);
                setLoading(false);
                return;
            }

            // Fetch friend profiles using user_id
            const { data: profilesData, error: profilesError } = await supabase
                .from('profiles')
                .select('*')
                .in('user_id', friendUserIds);

            if (profilesError) {
                console.error('Error fetching friend profiles:', profilesError);
                setFriends([]);
                setLoading(false);
                return;
            }

            // Format friends data
            const formattedFriends = profilesData.map(friend => ({
                ...friend,
                id: friend.user_id,
                lastSeen: friend.status === 'online' ? 'Online now' : formatLastSeen(friend.last_seen)
            }));

            setFriends(formattedFriends);
        } catch (error) {
            console.error('Error fetching friends:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchPendingRequests = async () => {
        if (!currentUser || !currentUserProfile) return;

        try {
            // Get pending friend requests sent to current user
            const { data: requests, error } = await supabase
                .from('friend_requests')
                .select('*')
                .eq('receiver_id', currentUser.id)
                .eq('status', 'pending');

            if (error) {
                console.error('Friend requests table error:', error);
                setPendingRequests([]);
                return;
            }

            if (!requests || requests.length === 0) {
                setPendingRequests([]);
                return;
            }

            // Get sender profiles using sender_id
            const senderIds = requests.map(req => req.sender_id);

            const { data: senderProfiles, error: profileError } = await supabase
                .from('profiles')
                .select('*')
                .in('user_id', senderIds);

            if (profileError) {
                console.error('Error fetching sender profiles:', profileError);
                setPendingRequests([]);
                return;
            }

            // Format friend requests
            const formattedRequests = requests.map(req => {
                const profile = senderProfiles.find(p => p.user_id === req.sender_id);
                return {
                    id: req.id,
                    username: profile?.username || `User_${req.sender_id.substring(0, 8)}`,
                    level: profile?.level || 1,
                    status: profile?.status || 'offline',
                    sentTime: formatRequestTime(req.created_at),
                    senderId: req.sender_id,
                    profileData: profile
                };
            });

            setPendingRequests(formattedRequests);
        } catch (error) {
            console.error('Error fetching pending requests:', error);
            setPendingRequests([]);
        }
    };

    const formatLastSeen = (lastSeen) => {
        if (!lastSeen) return 'Unknown';
        const date = new Date(lastSeen);
        const now = new Date();
        const diffMs = now - date;
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

        if (diffHours < 1) return 'Just now';
        if (diffHours < 24) return `${diffHours} hours ago`;
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays} days ago`;
    };

    const formatRequestTime = (createdAt) => {
        const date = new Date(createdAt);
        const now = new Date();
        const diffMs = now - date;
        const diffMinutes = Math.floor(diffMs / (1000 * 60));

        if (diffMinutes < 60) return `${diffMinutes} minutes ago`;
        const diffHours = Math.floor(diffMinutes / 60);
        if (diffHours < 24) return `${diffHours} hours ago`;
        const diffDays = Math.floor(diffHours / 24);
        return `${diffDays} days ago`;
    };

    const handleAcceptRequest = async (requestId, senderId) => {
        try {
            // Update friend request status to accepted
            const { error: updateError } = await supabase
                .from('friend_requests')
                .update({ status: 'accepted' })
                .eq('id', requestId);

            if (updateError) {
                console.error('Could not update friend request:', updateError);
                return;
            }

            // Create connection between users
            const { error: connectionError } = await supabase
                .from('connections')
                .insert({
                    user_id_one: currentUser.id,
                    user_id_two: senderId
                });

            if (connectionError) {
                console.error('Error creating connection:', connectionError);
                return;
            }

            // Refresh data
            fetchFriends();
            fetchPendingRequests();
        } catch (error) {
            console.error('Error accepting friend request:', error);
        }
    };

    const handleDeclineRequest = async (requestId) => {
        try {
            const { error } = await supabase
                .from('friend_requests')
                .update({ status: 'declined' })
                .eq('id', requestId);

            if (error) {
                console.error('Could not decline friend request:', error);
                return;
            }

            fetchPendingRequests();
        } catch (error) {
            console.error('Error declining friend request:', error);
        }
    };

    const handleRemoveFriend = async (friendUserId) => {
        try {
            // Remove connection
            const { error } = await supabase
                .from('connections')
                .delete()
                .or(`and(user_id_one.eq.${currentUser.id},user_id_two.eq.${friendUserId}),and(user_id_one.eq.${friendUserId},user_id_two.eq.${currentUser.id})`);

            if (error) {
                console.error('Error removing friend:', error);
                return;
            }

            fetchFriends();
        } catch (error) {
            console.error('Error removing friend:', error);
        }
    };

    const handleViewProfile = (friend) => {
        setSelectedProfile(friend);
    };

    const handleBackToFriends = () => {
        setSelectedProfile(null);
    };

    const searchForUsers = async (username) => {
        if (!username.trim() || !currentUser) {
            setSearchResults([]);
            return;
        }

        setSearching(true);
        try {
            // Search for users by username (excluding current user and existing friends)
            const { data: users, error } = await supabase
                .from('profiles')
                .select('*')
                .ilike('username', `%${username}%`)
                .neq('user_id', currentUser.id)
                .limit(10);

            if (error) {
                console.error('Error searching users:', error);
                setSearchResults([]);
                return;
            }

            // Filter out existing friends and pending requests
            const friendUserIds = friends.map(f => f.user_id);
            const pendingUserIds = pendingRequests.map(r => r.senderId);

            // Also check for outgoing requests
            const { data: outgoingRequests, error: outgoingError } = await supabase
                .from('friend_requests')
                .select('receiver_id')
                .eq('sender_id', currentUser.id)
                .in('status', ['pending', 'accepted']);

            const outgoingUserIds = outgoingError ? [] : outgoingRequests.map(r => r.receiver_id);

            const filteredUsers = users.filter(user =>
                !friendUserIds.includes(user.user_id) &&
                !pendingUserIds.includes(user.user_id) &&
                !outgoingUserIds.includes(user.user_id)
            );

            setSearchResults(filteredUsers);
        } catch (error) {
            console.error('Error searching for users:', error);
            setSearchResults([]);
        } finally {
            setSearching(false);
        }
    };

    const sendFriendRequest = async (targetUserId) => {
        try {
            const { error } = await supabase
                .from('friend_requests')
                .insert({
                    sender_id: currentUser.id,
                    receiver_id: targetUserId,
                    status: 'pending'
                });

            if (error) {
                console.error('Error sending friend request:', error);
                return;
            }

            // Remove from search results
            setSearchResults(prev => prev.filter(user => user.user_id !== targetUserId));
            setSearchUsername('');
        } catch (error) {
            console.error('Error sending friend request:', error);
        }
    };

    const handleAddFriendToggle = () => {
        setShowAddFriend(!showAddFriend);
        setSearchUsername('');
        setSearchResults([]);
    };

    const filteredFriends = friends.filter(friend =>
        friend.username?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // If viewing a profile, render HomePage component
    if (selectedProfile) {
        return (
            <HomePage
                userId={selectedProfile.user_id}
                userData={selectedProfile}
                onBack={handleBackToFriends}
                returnToSelf={true}
            />
        );
    }

    if (loading) {
        return (
            <div className="friends-page">
                <div className="loading-state">
                    <p>Loading friends...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="friends-page">
            <div className="friends-header">
                
                <h2>Friends Network</h2>
                <div className="header-actions">
                    <button
                        className={`pixel-button add-friend-btn ${showAddFriend ? 'active' : ''}`}
                        onClick={handleAddFriendToggle}
                    >
                        {showAddFriend ? 'Cancel' : 'Add Friend'}
                    </button>
                    <div className="friend-count">
                        Total Friends: {friends.length}
                    </div>
                </div>
            </div>

            {showAddFriend && (
                <div className="add-friend-section">
                    <h3>Search for Friends</h3>
                    <div className="add-friend-form">
                        <input
                            type="text"
                            placeholder="Enter username..."
                            value={searchUsername}
                            onChange={(e) => {
                                setSearchUsername(e.target.value);
                                searchForUsers(e.target.value);
                            }}
                            className="pixel-input"
                        />
                    </div>

                    {searching && (
                        <div className="searching-state">
                            <p>Searching...</p>
                        </div>
                    )}

                    {searchResults.length > 0 && (
                        <div className="search-results">
                            <h4>Search Results</h4>
                            {searchResults.map(user => (
                                <div key={user.user_id} className="friend-card search-result">
                                    <div className="friend-info">
                                        <div className="friend-avatar">
                                            <div className={`status-indicator ${user.status || 'offline'}`}></div>
                                        </div>
                                        <div className="friend-details">
                                            <h4>{user.username}</h4>
                                            <p>Level {user.level}</p>
                                            <p className="last-seen">
                                                {user.status === 'online' ? 'Online now' : formatLastSeen(user.last_seen)}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="friend-actions">
                                        <button
                                            className="pixel-button accept-button"
                                            onClick={() => sendFriendRequest(user.user_id)}
                                        >
                                            Send Request
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    {searchUsername && !searching && searchResults.length === 0 && (
                        <div className="empty-state">
                            <p>No users found with that username.</p>
                        </div>
                    )}
                </div>
            )}

 <div className="search-bar-wrapper">
    <button 
        className="pixel-button back-to-home"
        onClick={() => window.location.href = '/homepage'}
    >
        <ArrowLeft size={16} />
        <span>BACK</span>
    </button>

    <div className="friends-search">
        <input
            type="text"
            placeholder="Search friends..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pixel-input"
        />
    </div>
</div>

            <div className="friends-tabs">
                <button
                    className={`pixel-button tab-button ${activeTab === 'all' ? 'active' : ''}`}
                    onClick={() => setActiveTab('all')}
                >
                    All
                </button>
                <button
                    className={`pixel-button tab-button ${activeTab === 'online' ? 'active' : ''}`}
                    onClick={() => setActiveTab('online')}
                >
                    Online
                </button>
                <button
                    className={`pixel-button tab-button ${activeTab === 'requests' ? 'active' : ''}`}
                    onClick={() => setActiveTab('requests')}
                >
                    Requests {pendingRequests.length > 0 && `(${pendingRequests.length})`}
                </button>
            </div>

            <div className="friends-content">
                {activeTab === 'all' && (
                    <div className="friends-list">
                        <h3>Your Friends</h3>
                        {filteredFriends.length === 0 ? (
                            <div className="empty-state">
                                <p>No friends found matching your search.</p>
                            </div>
                        ) : (
                            filteredFriends.map(friend => (
                                <div key={friend.user_id} className="friend-card">
                                    <div className="friend-info">
                                        <div className="friend-avatar">
                                            <div className={`status-indicator ${friend.status || 'offline'}`}></div>
                                        </div>
                                        <div className="friend-details">
                                            <h4>{friend.username}</h4>
                                            <p>Level {friend.level}</p>
                                            <p className="last-seen">{friend.lastSeen}</p>
                                        </div>
                                    </div>
                                    <div className="friend-actions">
                                        <button
                                            className="pixel-button profile-button"
                                            onClick={() => handleViewProfile(friend)}
                                        >
                                            View Profile
                                        </button>
                                        <button
                                            className="pixel-button remove-button"
                                            onClick={() => handleRemoveFriend(friend.user_id)}
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'online' && (
                    <div className="friends-list">
                        <h3>Online Friends</h3>
                        {friends.filter(f => f.status === 'online').length === 0 ? (
                            <div className="empty-state">
                                <p>No friends are currently online.</p>
                            </div>
                        ) : (
                            friends.filter(f => f.status === 'online').map(friend => (
                                <div key={friend.user_id} className="friend-card">
                                    <div className="friend-info">
                                        <div className="friend-avatar">
                                            <div className={`status-indicator ${friend.status}`}></div>
                                        </div>
                                        <div className="friend-details">
                                            <h4>{friend.username}</h4>
                                            <p>Level {friend.level}</p>
                                            <p className="last-seen">{friend.lastSeen}</p>
                                        </div>
                                    </div>
                                    <div className="friend-actions">
                                        <button
                                            className="pixel-button profile-button"
                                            onClick={() => handleViewProfile(friend)}
                                        >
                                            View Profile
                                        </button>
                                        <button className="pixel-button invite-button">Invite to Game</button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}

                {activeTab === 'requests' && (
                    <div className="friends-list">
                        <h3>Friend Requests</h3>
                        {pendingRequests.length === 0 ? (
                            <div className="empty-state">
                                <p>No pending friend requests.</p>
                            </div>
                        ) : (
                            pendingRequests.map(request => (
                                <div key={request.id} className="friend-card request">
                                    <div className="friend-info">
                                        <div className="friend-avatar">
                                            <div className={`status-indicator ${request.status}`}></div>
                                        </div>
                                        <div className="friend-details">
                                            <h4>{request.username}</h4>
                                            <p>Level {request.level}</p>
                                            <p className="request-time">Sent {request.sentTime}</p>
                                        </div>
                                    </div>
                                    <div className="friend-actions">
                                        <button
                                            className="pixel-button accept-button"
                                            onClick={() => handleAcceptRequest(request.id, request.senderId)}
                                        >
                                            Accept
                                        </button>
                                        <button
                                            className="pixel-button decline-button"
                                            onClick={() => handleDeclineRequest(request.id)}
                                        >
                                            Decline
                                        </button>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}