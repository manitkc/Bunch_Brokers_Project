import React, { useState } from 'react';
import './friends.css';

export default function Friends() {
    const [activeTab, setActiveTab] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Mock data - in a real app, this would come from your database/API
    const [friends, setFriends] = useState([
        {
            id: '8225b980-96a8-4bcd-8fec-d0fcd123',
            username: 'PixelWarrior',
            status: 'online',
            level: 42,
            lastSeen: 'Online now'
        },
        {
            id: '32d3949e-361c-4e9a-8ee0-657cc456',
            username: 'QuestMaster',
            status: 'offline',
            level: 38,
            lastSeen: '2 hours ago'
        },
        {
            id: '8374f878-50ba-4acb-86a9-e538d789',
            username: 'RetroGamer',
            status: 'online',
            level: 55,
            lastSeen: 'Online now'
        }
    ]);

    const [suggestedFriends] = useState([
        {
            id: 'a72441ef-043c-4e36-ac98-b70f9abc',
            username: 'NewAdventurer',
            status: 'online',
            level: 12,
            mutualFriends: 2,
            reason: 'Mutual friends with PixelWarrior'
        },
        {
            id: '667366d9-b92b-418d-b063-e7c4def',
            username: 'CodeNinja',
            status: 'offline',
            level: 67,
            mutualFriends: 1,
            reason: 'Similar interests'
        }
    ]);

    const [pendingRequests] = useState([
        {
            id: 'pending-001',
            username: 'FriendlyPlayer',
            status: 'offline',
            level: 23,
            sentTime: '3 minutes ago'
        }
    ]);

    const handleAddFriend = (friendId) => {
        // In a real app, this would make an API call
        console.log('Adding friend:', friendId);
    };

    const handleAcceptRequest = (requestId) => {
        // In a real app, this would make an API call
        console.log('Accepting friend request:', requestId);
    };

    const handleDeclineRequest = (requestId) => {
        // In a real app, this would make an API call
        console.log('Declining friend request:', requestId);
    };

    const handleRemoveFriend = (friendId) => {
        // In a real app, this would make an API call
        console.log('Removing friend:', friendId);
    };

    const filteredFriends = friends.filter(friend =>
        friend.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="friends-page">
            <div className="friends-header">
                <h2>Friends Network</h2>
                <div className="friend-count">
                    Total Friends: {friends.length}
                </div>
            </div>

            <div className="friends-search">
                <input
                    type="text"
                    placeholder="Search friends..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pixel-input"
                />
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
                    className={`pixel-button tab-button ${activeTab === 'suggested' ? 'active' : ''}`}
                    onClick={() => setActiveTab('suggested')}
                >
                    Suggested
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
                                <div key={friend.id} className="friend-card">
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
                                        <button className="pixel-button message-button">Message</button>
                                        <button
                                            className="pixel-button remove-button"
                                            onClick={() => handleRemoveFriend(friend.id)}
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
                        {friends.filter(f => f.status === 'online').map(friend => (
                            <div key={friend.id} className="friend-card">
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
                                    <button className="pixel-button message-button">Message</button>
                                    <button className="pixel-button invite-button">Invite to Game</button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === 'suggested' && (
                    <div className="friends-list">
                        <h3>Suggested Friends</h3>
                        {suggestedFriends.map(friend => (
                            <div key={friend.id} className="friend-card suggested">
                                <div className="friend-info">
                                    <div className="friend-avatar">
                                        <div className={`status-indicator ${friend.status}`}></div>
                                    </div>
                                    <div className="friend-details">
                                        <h4>{friend.username}</h4>
                                        <p>Level {friend.level}</p>
                                        <p className="suggestion-reason">{friend.reason}</p>
                                        <p className="mutual-friends">{friend.mutualFriends} mutual friends</p>
                                    </div>
                                </div>
                                <div className="friend-actions">
                                    <button
                                        className="pixel-button add-button"
                                        onClick={() => handleAddFriend(friend.id)}
                                    >
                                        Add Friend
                                    </button>
                                </div>
                            </div>
                        ))}
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
                                            onClick={() => handleAcceptRequest(request.id)}
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