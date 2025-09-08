import { useState } from "react";
import { Button } from "./ui/Button";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Textarea } from "./ui/Textarea";
import axios from "axios";

export default function ProfileSettingsSection({ userInfo, setUser, setSelectedPage }) {
    const [firstName, setFirstName] = useState(userInfo?.first_name || "");
    const [lastName, setLastName] = useState(userInfo?.last_name || "");
    const [email, setEmail] = useState(userInfo?.email || "");
    const [bio, setBio] = useState(userInfo?.bio || "");
    const [phone, setPhone] = useState(userInfo?.phone || "");
    const [location, setLocation] = useState(userInfo?.location || "");
    const [error, setError] = useState("");
    const [avatar, setAvatar] = useState(null);
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');
    const [editingMode, setEditingMode] = useState(false);

    const [avatarFile, setAvatarFile] = useState(null);
    const auth_token = localStorage.getItem("auth_token");

    const handleAvatarChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setAvatar(URL.createObjectURL(e.target.files[0])); // For preview
            setAvatarFile(e.target.files[0]); // For upload
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!firstName || !lastName || !email || !phone) {
            setError("Please fill in all fields.");
            return;
        }
        try {
            const formData = new FormData();
            formData.append("first_name", firstName);
            formData.append("last_name", lastName);
            formData.append("email", email);
            formData.append("bio", bio);
            formData.append("phone", phone);
            formData.append("location", location);
            
            if (avatarFile) {
                formData.append("profile_photo", avatarFile);
            }
            formData.append("_token", csrfToken);
            await axios.post(`/api/v1/users/${userInfo.id}`, formData, {
                headers: {
                    Authorization: `Bearer ${auth_token}`,
                },
            });
            // Optionally, refresh user data in localStorage or context
            const res = await axios.get("/api/v1/checkuser", {
                headers: {
                    Authorization: `Bearer ${auth_token}`,
                },
            });

            localStorage.setItem("user", JSON.stringify(res.data.user));
            setEditingMode(false)
            setUser(res.data.user);
            // window.location.href = "/";
        } catch (err) {
            setError(err.response?.data?.message || "Update failed");
        }
    };

    return (
        <section className="max-w-6xl mx-auto py-10 px-4">
            <div className="mb-4 flex items-center justify-between">
                <button
                    type="button"
                    className="flex items-center text-sm text-gray-300 hover:text-indigo-400 transition-colors cursor-pointer"
                    onClick={() => setSelectedPage ? setSelectedPage("Dashboard") : ""}
                >
                    <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
                    </svg>
                    Back to Dashboard
                </button>
            </div>
            <h1 className="text-3xl font-bold mb-1">Profile Settings</h1>
            <p className="text-gray-400 mb-8">Manage your account settings and preferences</p>
            {error && (
                <div className="mb-4 text-red-500 bg-red-100 rounded px-4 py-2">
                    {error}
                </div>
            )}
            <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <input type="hidden" name="_token" value={csrfToken} />
                {/* Left: Personal Info */}
                <div className="lg:col-span-2 flex flex-col gap-6">
                    <div className="rounded-xl bg-gray-900 border border-gray-800 p-6 relative">
                        <div className="flex items-center mb-2 relative">
                            <h3 className="font-semibold mb-2">Personal Information</h3>
                            {!editingMode && (
                                <button
                                    type="button"
                                    className="flex absolute top-1 right-4 font-sm items-center text-indigo-600 hover:text-indigo-400 font-medium mr-3 cursor-pointer"
                                    onClick={() => setEditingMode(true)}
                                    aria-label="Edit Profile"
                                >
                                    <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 3.487a2.25 2.25 0 1 1 3.182 3.182L7.5 19.213l-4 1 1-4L16.862 3.487z" />
                                    </svg>
                                    Edit Profile
                                </button>
                            )}
                        </div>
                        <p className="text-xs text-gray-400 mb-4">
                            Update your personal details and profile information
                        </p>
                        <div className="flex items-center gap-6 mb-6">
                            <div className="w-20 h-20 rounded-full bg-gray-700 flex items-center justify-center overflow-hidden">
                                {avatar ? (
                                    <img src={avatar} alt="Avatar" className="w-full h-full object-cover rounded-full" />
                                ) : (
                                    <img
                                        className="inline-block rounded-full"
                                        src={userInfo?.profile_photo_path || "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?ixlib=rb-4.0.3&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"}
                                        alt={userInfo?.name || "User"}
                                    />
                                )}
                            </div>
                            <div>
                                {editingMode ? (
                                   <>
                                   <input
                                    type="file"
                                    accept="image/*"
                                    className="block text-xs text-gray-400"
                                    onChange={handleAvatarChange}
                                    disabled={!editingMode}
                                    />
                                    <span className="block text-xs text-gray-500 mt-1">
                                        JPG, PNG or GIF. Max size 2MB.
                                    </span>
                                </>
                                
                                ) : (
                                    <span></span>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-4">
                            <div>
                                <Label>First Name</Label>
                                {editingMode ? (
                                    <Input
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        placeholder="First Name"
                                        name="first_name"
                                        autoFocus
                                    />
                                ) : (
                                    <span className="text-white">{firstName}</span>
                                )}
                            </div>
                            <div>
                                <Label>Last Name</Label>
                                {editingMode ? (
                                    <Input
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        placeholder="Last Name"
                                        name="last_name"
                                    />
                                ) : (
                                    <span className="text-white">{lastName}</span>
                                )}
                            </div>
                        </div>
                        <div className="mb-4">
                            <Label>Email Address</Label>
                            <Input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Email Address"
                                className="w-100"
                                name="email"
                                disabled
                                hidden
                            />
                            <span className="text-white">{email}</span>
                        </div>
                        <div>
                            <Label>Bio</Label>
                            {editingMode ? (
                                <Textarea
                                    value={bio}
                                    onChange={(e) => setBio(e.target.value)}
                                    placeholder="Tell us about yourself..."
                                    rows={3}
                                    name="bio"
                                />
                            ) : (
                                <span className="text-white">{bio}</span>
                            )}
                        </div>
                    </div>
                    <div className="rounded-xl bg-gray-900 border border-gray-800 p-6">
                        <h3 className="font-semibold mb-2">Contact Details</h3>
                        <p className="text-xs text-gray-400 mb-4">
                            Manage your contact information and work details
                        </p>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>Phone Number</Label>
                                {editingMode ? (
                                    <Input
                                        value={phone}
                                        name="phone"
                                        type="number"
                                        onChange={(e) => setPhone(e.target.value)}
                                    />
                                ) : (
                                    <span className="text-white">{phone}</span>
                                )}
                            </div>
                            <div>
                                <Label>Location</Label>
                                {editingMode ? (
                                    <Input
                                        value={location}
                                        onChange={(e) => setLocation(e.target.value)}
                                        name="location"
                                        type="text"
                                    />
                                ) : (
                                    <span className="text-white">{location}</span>
                                )}
                            </div>
                            <div>
                                <Label>Department</Label>
                                <Input value={userInfo?.department.name || ""} disabled hidden/>
                                <span className="text-white">{userInfo?.department.name || ""}</span>
                            </div>
                            <div>
                                <Label>Role</Label>
                                <Input value={userInfo?.role.name || ""} disabled hidden/>
                                <span className="text-white">{userInfo?.role.name || ""}</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* Right: Preferences and Status */}
                <div className="flex flex-col gap-6">
                    {/* <div className="rounded-xl bg-gray-900 border border-gray-800 p-6">
                        <h3 className="font-semibold mb-2">Notifications</h3>
                        <p className="text-xs text-gray-400 mb-4">
                        Configure how you receive notifications
                        </p>
                        <div className="flex flex-col gap-2">
                        <label className="flex items-center justify-between">
                            <span>Email Notifications</span>
                            <input type="checkbox" className="accent-indigo-500" defaultChecked />
                        </label>
                        <label className="flex items-center justify-between">
                            <span>Push Notifications</span>
                            <input type="checkbox" className="accent-indigo-500" defaultChecked />
                        </label>
                        <label className="flex items-center justify-between">
                            <span>Desktop Notifications</span>
                            <input type="checkbox" className="accent-indigo-500" />
                        </label>
                        <label className="flex items-center justify-between">
                            <span>Weekly Summary</span>
                            <input type="checkbox" className="accent-indigo-500" defaultChecked />
                        </label>
                        </div>
                    </div> */}
                    <div className="rounded-xl bg-gray-900 border border-gray-800 p-6">
                        <h3 className="font-semibold mb-2">Preferences</h3>
                        <p className="text-xs text-gray-400 mb-4">
                        Customize your experience
                        </p>
                        <div className="mb-2">
                            <Label>Theme</Label>
                            <select className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white">
                                <option>Dark</option>
                                <option>Light</option>
                            </select>
                        </div>
                        <div>
                            <Label>Timezone</Label>
                            <select className="w-full bg-gray-800 border border-gray-700 rounded px-2 py-1 text-white">
                                <option>Pacific Standard Time</option>
                                <option>Eastern Standard Time</option>
                                <option>Central European Time</option>
                            </select>
                        </div>
                    </div>
                    <div className="rounded-xl bg-gray-900 border border-gray-800 p-6">
                        <h3 className="font-semibold mb-2">Account Status</h3>
                        <div className="flex flex-col gap-2 text-sm">
                            <div className="flex justify-between">
                                <span>Account Type:</span>
                                <span>{userInfo?.role.name || ""} of {userInfo?.department.name || ""} </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Member Since:</span>
                                <span>
                                    {userInfo?.created_at ? new Date(userInfo.created_at).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                            })
                                        : ""
                                    }
                                </span>
                            </div>
                            <div className="flex justify-between">
                                <span>Status:</span>
                                <span>{userInfo?.is_active ? "Active" : "Not Active"}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="lg:col-span-3 flex justify-end mt-4">
                    {editingMode && (
                        <>
                            <Button type="button" variant="outline" className="mr-2 cursor-pointer" onClick={() => setEditingMode(false)}>
                                Cancel Changes
                            </Button>
                            <Button type="submit" className="cursor-pointer">
                                Save Changes
                            </Button>
                        </>
                    )}
                </div>
            </form>
        </section>
    );
}