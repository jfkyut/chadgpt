import { useProfileStore } from "@/stores/profile";

export const useGuard = () => {

  /**
 * Create a navigation guard factory that takes a condition and a redirect name,
 * and returns a navigation guard function.
 *
 * @param {function} condition - A function that evaluates a profile and returns a boolean condition.
 * @param {string} redirectName - The name of the route to redirect to if the condition is not met.
 */
  const createGuard = (condition, redirectName) => async (_, __, next) => {
    const profileStore = useProfileStore();
    await profileStore.getProfile();
  
    condition(profileStore)
      ? next()
      : next({ name: redirectName });
  } 

  return { createGuard }
}