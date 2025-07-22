import { StyleSheet } from 'react-native';

export const colors = {
  bgPrimary: '#1a1a1a',
  textPrimary: '#f5f5f5',
  accentBlue: '#007bff',
  playerTeal: '#39cccc',
  playerPink: '#f012be',
  success: '#28a745',
  warning: '#ffc107',
  danger: '#dc3545',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const radii = {
  sm: 6,
  md: 8,
  lg: 12,
  xl: 16,
};

export const styles = StyleSheet.create({
  h1: {
    fontSize: 40,
    fontWeight: '600',
    lineHeight: 48,
    marginBottom: spacing.md,
  },
  h2: {
    fontSize: 32,
    fontWeight: '600',
    lineHeight: 40,
    marginBottom: spacing.md,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600',
    lineHeight: 32,
    marginBottom: spacing.md,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
    marginBottom: spacing.md,
  },
  h5: {
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  h6: {
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: spacing.md,
  },
  p: {
    marginBottom: spacing.md,
  },
  btn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.lg,
    borderRadius: radii.md,
    minHeight: 44,
  },
  btnPrimary: {
    backgroundColor: colors.accentBlue,
  },
  btnText: {
    color: 'white',
    fontWeight: '500',
    fontSize: 16,
  },
  btnSecondary: {
    backgroundColor: 'rgba(245, 245, 245, 0.1)',
    borderColor: 'rgba(245, 245, 245, 0.2)',
    borderWidth: 1,
  },
  btnSecondaryText: {
    color: colors.textPrimary,
  },
  input: {
    width: '100%',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(245, 245, 245, 0.2)',
    borderRadius: radii.md,
    backgroundColor: 'rgba(245, 245, 245, 0.05)',
    color: colors.textPrimary,
    fontSize: 16,
  },
  card: {
    backgroundColor: 'rgba(245, 245, 245, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(245, 245, 245, 0.1)',
    borderRadius: radii.lg,
    padding: spacing.lg,
  },
  container: {
    flex: 1,
    backgroundColor: colors.bgPrimary,
  },
  flex: {
    display: 'flex',
  },
  flexCol: {
    flexDirection: 'column',
  },
  flexRow: {
    flexDirection: 'row',
  },
  itemsCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  justifyBetween: {
    justifyContent: 'space-between',
  },
  gapSm: {
    gap: spacing.sm,
  },
  gapMd: {
    gap: spacing.md,
  },
  gapLg: {
    gap: spacing.lg,
  },
  gapXl: {
    gap: spacing.xl,
  },
  mtSm: {
    marginTop: spacing.sm,
  },
  mtMd: {
    marginTop: spacing.md,
  },
  mtLg: {
    marginTop: spacing.lg,
  },
  mtXl: {
    marginTop: spacing.xl,
  },
  mbSm: {
    marginBottom: spacing.sm,
  },
  mbMd: {
    marginBottom: spacing.md,
  },
  mbLg: {
    marginBottom: spacing.lg,
  },
  mbXl: {
    marginBottom: spacing.xl,
  },
  textCenter: {
    textAlign: 'center',
  },
  player1: {
    color: colors.playerTeal,
  },
  player2: {
    color: colors.playerPink,
  },
});
