'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, UserRole, AuthResponse } from '@/types/api';
import { apiClient } from '@/lib/api-client';

interface AuthContextType {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User>;
  quickLogin: (role: UserRole) => Promise<User>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Quick seed credentials for demo switching
export const SEED_ACCOUNTS: Record<UserRole, { email: string; pass: string; label: string; roleName: string }> = {
  ORG_ADMIN: {
    email: 'admin@laz.id',
    pass: 'admin123',
    label: 'Administrator LAZ',
    roleName: 'ORG_ADMIN (Full Access)',
  },
  DIRECTOR: {
    email: 'director@laz.id',
    pass: 'admin123',
    label: 'Head of Partnership',
    roleName: 'DIRECTOR (Create Program & Pipeline Overview)',
  },
  FUNDRAISER: {
    email: 'fundraiser@laz.id',
    pass: 'admin123',
    label: 'Account Executive',
    roleName: 'FUNDRAISER (Read Programs, Personal Deals)',
  },
  CORP_ADMIN: {
    email: 'admin@corporate.com',
    pass: 'admin123',
    label: 'Corporate Admin (Demo)',
    roleName: 'CORP_ADMIN (Full Corporate Access)',
  },
  CSR_MANAGER: {
    email: 'csr@corporate.com',
    pass: 'admin123',
    label: 'CSR Manager (Demo)',
    roleName: 'CSR_MANAGER (Manage Opportunities & Review)',
  },
  REVIEWER: {
    email: 'reviewer@corporate.com',
    pass: 'admin123',
    label: 'Proposal Assessor (Demo)',
    roleName: 'REVIEWER (Read & Evaluate Proposals)',
  },
  SUPERADMIN: {
    email: 'admin@sovera.id',
    pass: 'admin123',
    label: 'Platform Superadmin',
    roleName: 'SUPERADMIN (System Operator)',
  },
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('sovera_auth_token');
    const savedUser = localStorage.getItem('sovera_auth_user');

    if (savedToken && savedUser) {
      try {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error('Failed to parse cached user:', e);
      }
    }

    // Verify token with backend /auth/me if token exists
    if (savedToken) {
      // Mock/seed tokens are used for demo — keep cached user without backend verification
      const isMockToken = savedToken.startsWith('mock-jwt-token-');

      if (isMockToken) {
        // Already loaded from localStorage above — no backend call needed
        setIsLoading(false);
      } else {
        apiClient
          .get('/auth/me')
          .then((res: any) => {
            if (res?.data) {
              setUser(res.data);
              localStorage.setItem('sovera_auth_user', JSON.stringify(res.data));
            }
          })
          .catch(() => {
            // If real token invalid, clear cache and force re-login
            localStorage.removeItem('sovera_auth_token');
            localStorage.removeItem('sovera_auth_user');
            setToken(null);
            setUser(null);
          })
          .finally(() => setIsLoading(false));
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<User> => {
    try {
      const res: any = await apiClient.post('/auth/login', { email, password });
      if (res?.success && res?.token && res?.user) {
        const newToken = res.token;
        const newUser = res.user;

        setToken(newToken);
        setUser(newUser);

        localStorage.setItem('sovera_auth_token', newToken);
        localStorage.setItem('sovera_auth_user', JSON.stringify(newUser));

        return newUser;
      }
    } catch (apiErr: any) {
      // Fallback for seed accounts in demo environment
      const seedEntry = Object.entries(SEED_ACCOUNTS).find(
        ([_, acc]) => acc.email.toLowerCase() === email.toLowerCase() && acc.pass === password
      );

      if (seedEntry) {
        const [roleKey, acc] = seedEntry;
        const isCorpRole = roleKey.startsWith('CORP') || roleKey === 'CSR_MANAGER' || roleKey === 'REVIEWER';
        const mockUser: User = {
          id: `seed-user-${roleKey.toLowerCase()}`,
          org_id: isCorpRole
            ? '99999999-9999-4000-a000-000000000001'
            : '77123aaa-8819-4c12-99a1-00123456789a',
          org_name: isCorpRole ? 'Corporate (demo)' : 'LAZ Peduli Ummat',
          email: acc.email,
          full_name: acc.label,
          role: roleKey as UserRole,
          tenant_type: isCorpRole ? 'CORPORATE' : 'ORGANIZATION',
          is_active: true,
          created_at: new Date().toISOString(),
        };
        const mockToken = `mock-jwt-token-${roleKey.toLowerCase()}`;
        setToken(mockToken);
        setUser(mockUser);
        localStorage.setItem('sovera_auth_token', mockToken);
        localStorage.setItem('sovera_auth_user', JSON.stringify(mockUser));
        return mockUser;
      }

      throw new Error(apiErr?.message || 'Login gagal. Periksa kembali email dan password.');
    }

    throw new Error('Login gagal. Periksa kembali email dan password.');
  };

  const quickLogin = async (role: UserRole): Promise<User> => {
    const acc = SEED_ACCOUNTS[role];
    return login(acc.email, acc.pass);
  };

  const logout = () => {
    localStorage.removeItem('sovera_auth_token');
    localStorage.removeItem('sovera_auth_user');
    setToken(null);
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, token, isLoading, login, quickLogin, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
