import { useGuard } from "@/utilities/guard";

const { createGuard } = useGuard();

const guards = () => {
  const authenticated = createGuard(
    (profile) => profile.isAuthenticated,
    'login'
  );

  const guest = createGuard(
    (profile) => !profile.isAuthenticated,
    'home'
  );

  const verified = createGuard(
    (profile) => profile.isVerified,
    'verify-email'
  );

  const notVerified = createGuard(
    (profile) => !profile.isVerified,
    'home'
  );

  return { authenticated, guest, verified, notVerified };
}

export default guards;
