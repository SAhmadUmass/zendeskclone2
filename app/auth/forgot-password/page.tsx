'use client';

import React from 'react';
import { AuthLayout } from '@/components/auth/AuthLayout';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  return (
    <AuthLayout
      title="Forgot password?"
      subtitle="No worries, we'll send you reset instructions."
    >
      <form className="mt-8 space-y-6">
        <Input
          label="Email address"
          type="email"
          required
          autoComplete="email"
        />
        <Button type="submit">Send reset instructions</Button>
        <p className="text-center text-sm text-gray-600">
          Remember your password?{" "}
          <Link
            href="/auth/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Back to sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
} 