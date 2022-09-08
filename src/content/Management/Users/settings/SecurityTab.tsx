import {
  Box,
  Button,
  Card,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography
} from '@mui/material';

function SecurityTab() {
  return (
    <Grid container spacing={3}>
      {/* <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">Social Accounts</Typography>
          <Typography variant="subtitle2">
            Manage connected social accounts options
          </Typography>
        </Box>
        <Card>
          <List>
            <ListItem sx={{ p: 3 }}>
              <ListItemAvatar sx={{ pr: 2 }}>
                <AvatarWrapper src="/static/images/logo/google.svg" />
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary="Google"
                secondary="A Google account hasn’t been yet added to your account"
              />
              <Button color="secondary" size="large" variant="contained">
                Connect
              </Button>
            </ListItem>
          </List>
        </Card>
      </Grid> */}
      {/* <Grid item xs={12}>
        <Card>
          <List>
            <ListItem sx={{ p: 3 }}>
              <ListItemAvatar sx={{ pr: 2 }}>
                <AvatarSuccess>
                  <DoneTwoToneIcon />
                </AvatarSuccess>
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary="Facebook"
                secondary="Your Facebook account has been successfully connected"
              />
              <ButtonError size="large" variant="contained">
                Revoke access
              </ButtonError>
            </ListItem>
            <Divider component="li" />
            <ListItem sx={{ p: 3 }}>
              <ListItemAvatar sx={{ pr: 2 }}>
                <AvatarSuccess>
                  <DoneTwoToneIcon />
                </AvatarSuccess>
              </ListItemAvatar>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary="Twitter"
                secondary="Your Twitter account was last syncronized 6 days ago"
              />
              <ButtonError size="large" variant="contained">
                Revoke access
              </ButtonError>
            </ListItem>
          </List>
        </Card>
      </Grid> */}
      <Grid item xs={12}>
        <Box pb={2}>
          <Typography variant="h3">Security</Typography>
          <Typography variant="subtitle2">
            Change your security preferences below
          </Typography>
        </Box>
        <Card>
          <List>
            <ListItem sx={{ p: 3 }}>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary="Change Password"
                secondary="You can change your password here"
              />
              <Button size="large" variant="outlined">
                Change password
              </Button>
            </ListItem>
            {/* <Divider component="li" /> */}
            {/* <ListItem sx={{ p: 3 }}>
              <ListItemText
                primaryTypographyProps={{ variant: 'h5', gutterBottom: true }}
                secondaryTypographyProps={{
                  variant: 'subtitle2',
                  lineHeight: 1
                }}
                primary="Two-Factor Authentication"
                secondary="Enable PIN verification for all sign in attempts"
              />
              <Switch color="primary" />
            </ListItem> */}
          </List>
        </Card>
      </Grid>
      {/* <Grid item xs={12}>
        <Card>
          <CardHeader
            subheaderTypographyProps={{}}
            titleTypographyProps={{}}
            title="Access Logs"
            subheader="Recent sign in activity logs"
          />
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Browser</TableCell>
                  <TableCell>IP Address</TableCell>
                  <TableCell>Location</TableCell>
                  <TableCell>Date/Time</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {logs.map((log) => (
                  <TableRow key={log.id} hover>
                    <TableCell>{log.browser}</TableCell>
                    <TableCell>{log.ipaddress}</TableCell>
                    <TableCell>{log.location}</TableCell>
                    <TableCell>
                      {format(log.date, 'dd MMMM, yyyy - h:mm:ss a')}
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip placement="top" title="Delete" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.error.lighter
                            },
                            color: theme.palette.error.main
                          }}
                          color="inherit"
                          size="small"
                        >
                          <DeleteTwoToneIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box p={2}>
            <TablePagination
              component="div"
              count={100}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </Card>
      </Grid> */}
    </Grid>
  );
}

export default SecurityTab;
