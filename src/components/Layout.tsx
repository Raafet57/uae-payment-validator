import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  AppBar,
  Toolbar,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  useTheme,
  useMediaQuery,
  Chip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  CheckCircle as ValidateIcon,
  ReportProblem as ExceptionIcon,
  AccountBalance as IBANIcon,
  Search as ExploreIcon,
  MenuBook as ReferenceIcon,
  AccountTree as TaxonomyIcon,
  Description as DocsIcon,
  FlightTakeoff as CorridorsIcon,
  Translate as TranslatorIcon,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { healthApi } from '../services/api';

const drawerWidth = 260;

const navItems = [
  { path: '/', label: 'Dashboard', icon: <DashboardIcon /> },
  { path: '/validate', label: 'Transaction Validator', icon: <ValidateIcon /> },
  { path: '/exception', label: 'Exception Investigation', icon: <ExceptionIcon /> },
  { path: '/iban', label: 'IBAN Validator', icon: <IBANIcon /> },
  { path: '/codes', label: 'Code Explorer', icon: <ExploreIcon /> },
  { path: '/reference', label: 'Code Reference', icon: <ReferenceIcon /> },
  { path: '/taxonomy', label: 'Taxonomy Harmonization', icon: <TaxonomyIcon /> },
  { path: '/corridors', label: 'UAE Corridors', icon: <CorridorsIcon /> },
  { path: '/translator', label: 'Code Translator', icon: <TranslatorIcon /> },
  { path: '/docs', label: 'Documentation', icon: <DocsIcon /> },
];

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const { data: health } = useQuery({
    queryKey: ['health'],
    queryFn: healthApi.getHealth,
    refetchInterval: 30000,
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* UAE Flag Colors Bar */}
      <Box sx={{ display: 'flex', height: 4 }}>
        <Box sx={{ flex: 1, bgcolor: '#006C35' }} />
        <Box sx={{ flex: 1, bgcolor: '#FFFFFF' }} />
        <Box sx={{ flex: 1, bgcolor: '#000000' }} />
        <Box sx={{ flex: 1, bgcolor: '#CE1126' }} />
      </Box>

      {/* Logo Area */}
      <Box sx={{ p: 3, borderBottom: '1px solid', borderColor: 'divider' }}>
        <Typography variant="h5" sx={{ fontWeight: 700, color: 'primary.main' }}>
          UAE Payment
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Validator
        </Typography>
      </Box>

      {/* Navigation */}
      <List sx={{ flex: 1, py: 2 }}>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ px: 1 }}>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                if (isMobile) setMobileOpen(false);
              }}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                '&.Mui-selected': {
                  bgcolor: 'primary.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'primary.dark',
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'white',
                  },
                },
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Footer */}
      <Box sx={{ p: 2, borderTop: '1px solid', borderColor: 'divider' }}>
        <Typography variant="caption" color="text.secondary" display="block">
          UAEFTS AUX700 Compliant
        </Typography>
        <Typography variant="caption" color="text.secondary">
          Central Bank of UAE
        </Typography>
      </Box>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
      {/* App Bar - Mobile */}
      <AppBar
        position="fixed"
        sx={{
          display: { md: 'none' },
          bgcolor: 'white',
          color: 'text.primary',
          boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ fontWeight: 600, color: 'primary.main' }}>
            UAE Payment Validator
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Sidebar - Mobile */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      {/* Sidebar - Desktop */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', md: 'block' },
          '& .MuiDrawer-paper': {
            boxSizing: 'border-box',
            width: drawerWidth,
            borderRight: '1px solid',
            borderColor: 'divider',
          },
        }}
        open
      >
        {drawer}
      </Drawer>

      {/* Main Content */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          width: { xs: '100%', md: `calc(100% - ${drawerWidth}px)` },
          ml: { xs: 0, md: `${drawerWidth}px` },
          mt: { xs: 8, md: 0 },
        }}
      >
        {/* Top Bar - Desktop */}
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            justifyContent: 'flex-end',
            p: 2,
            borderBottom: '1px solid',
            borderColor: 'divider',
            bgcolor: 'white',
          }}
        >
          <Chip
            label={health?.status === 'healthy' ? 'API Connected' : 'API Offline'}
            color={health?.status === 'healthy' ? 'success' : 'error'}
            size="small"
            sx={{ mr: 1 }}
          />
          <Typography variant="body2" color="text.secondary">
            {health?.config?.total_purpose_codes || 117} UAE Purpose Codes
          </Typography>
        </Box>

        {/* Page Content */}
        <Box sx={{ p: 3 }}>{children}</Box>
      </Box>
    </Box>
  );
};

export default Layout;
