import React from "react";

export type UserResponse = {
    id: string;
    email: string;
};

export type AuthContext = {
    isLoggedIn: boolean;
    token: string | null;
    user: UserResponse | null;
    loading: boolean;
    setUser: React.Dispatch<React.SetStateAction<UserResponse | null>>;
    setAuthUser: (payload: { token: string; user: UserResponse }) => void;
    logout: () => void;
}

export type LoginResponse = {
    id: string;
    email: string;
    token: string;
};

export type RegisterResponse = {
    message: string;
}