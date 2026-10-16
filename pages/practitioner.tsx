import React, { useState, useEffect, MouseEvent } from "react";
import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import { getSession } from "next-auth/react";
import {
  Box,
  Typography,
  AppBar,
  Toolbar,
  IconButton,
  Container,
  Button,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { ArrowBack, FilterList, KeyboardArrowDown } from "@mui/icons-material";
import PractitionerCard, {
  Practitioner,
} from "@/components/practitioner/PractitionerCard";
import { practitionerList } from "@/utils/api/practitioner-management";
import { SessionUser } from "@/types"; // Add this import at the top if not present

type FilterType =
  | "name"
  | "specialty"
  | "location"
  | "classType"
  | "experience"
  | "upcomingSessions";

interface Filters {
  name: string;
  specialty: string;
  location: string;
  classType: string;
  experience: string;
  upcomingSessions: string;
}

interface Props {
  userDetails: SessionUser;
  allPractitioner: {
    data: {
      data: Practitioner[];
    };
  };
}

const AllPractitionersScreen: React.FC<Props> = ({ allPractitioner }) => {
  const router = useRouter();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [practitioners, setPractitioners] = useState<Practitioner[]>([]);
  const [anchorEls, setAnchorEls] = useState<
    Record<string, HTMLElement | null>
  >({});
  const [filters, setFilters] = useState<Filters>({
    name: "All",
    specialty: "All",
    location: "All",
    classType: "All",
    experience: "All",
    upcomingSessions: "All",
  });

  const [mobileFilterAnchorEl, setMobileFilterAnchorEl] =
    useState<null | HTMLElement>(null);
  const [activeMobileFilter, setActiveMobileFilter] =
    useState<FilterType | null>(null);
  const [mobileSubMenuAnchorEl, setMobileSubMenuAnchorEl] =
    useState<null | HTMLElement>(null);

  const handleMobileFilterClick = (event: React.MouseEvent<HTMLElement>) => {
    setMobileFilterAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    if (allPractitioner?.data?.data) {
      setPractitioners(allPractitioner.data.data);
    }
  }, [allPractitioner]);

  const filterOptions: Record<FilterType, string[]> = {
    name: ["All", "Sessions", "Studio Sessions", "Online Sessions"],
    specialty: [
      "All",
      "Yoga",
      "Breathwork",
      "Sound Healing",
      "Meditation",
      "Massage",
    ],
    location: [
      "All",
      "Within 5 miles",
      "Within 10 miles",
      "Within 20 miles",
      "Anywhere",
    ],
    classType: ["All", "Group", "Private", "1-on-1", "Workshop"],
    experience: ["All", "Beginner", "Intermediate", "Advanced", "All Levels"],
    upcomingSessions: ["All", "Today", "This Week", "This Month", "Anytime"],
  };

  const handleFilterClick = (
    filterType: FilterType,
    event: MouseEvent<HTMLButtonElement>
  ) => {
    setAnchorEls({ ...anchorEls, [filterType]: event.currentTarget });
  };

  const handleFilterClose = (filterType: FilterType) => {
    setAnchorEls({ ...anchorEls, [filterType]: null });
  };

  const handleFilterSelect = (filterType: FilterType, value: string) => {
    setFilters({ ...filters, [filterType]: value });
    handleFilterClose(filterType);
  };

  const clearAllFilters = () => {
    setFilters({
      name: "All",
      specialty: "All",
      location: "All",
      classType: "All",
      experience: "All",
      upcomingSessions: "All",
    });
  };

  // const toggleFavorite = (id: number) => {
  //   setPractitioners((prev) =>
  //     prev.map((p) => (p.id === id ? { ...p, isFavorited: !p.isFavorited } : p))
  //   );
  // };

  const FilterButton: React.FC<{
    label: string;
    filterType: FilterType;
  }> = ({ label, filterType }) => (
    <>
      <Button
        variant="outlined"
        onClick={(e) => handleFilterClick(filterType, e)}
        endIcon={<KeyboardArrowDown />}
        sx={{
          backgroundColor: "white",
          color: "#2C2C2C",
          border: "1px solid #E0E0E0",
          borderRadius: "10px",
          textTransform: "none",
          fontWeight: 500,
          fontSize: "14px",
          height: "36px",
          minWidth: "auto",
          px: 2,
          "&:hover": {
            backgroundColor: "#F5F5F5",
            borderColor: "#6B8B5C",
          },
        }}
      >
        {filters[filterType] === "All" ? label : filters[filterType]}
      </Button>

      <Menu
        anchorEl={anchorEls[filterType]}
        open={Boolean(anchorEls[filterType])}
        onClose={() => handleFilterClose(filterType)}
        MenuListProps={{ sx: { py: 0 } }}
      >
        {filterOptions[filterType].map((option) => (
          <MenuItem
            key={option}
            onClick={() => handleFilterSelect(filterType, option)}
            sx={{
              fontSize: "14px",
              backgroundColor:
                filters[filterType] === option ? "#E8D5C4" : "transparent",
              "&:hover": {
                backgroundColor: "#F5F5F5",
              },
            }}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </>
  );

  return (
    <Box sx={{ backgroundColor: "#F5F1ED", minHeight: "100vh" }}>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: "white",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          borderBottom: "1px solid #E0E0E0",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between", px: isMobile ? 2 : 3 }}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {isMobile && (
              <IconButton
                onClick={() => router.back()}
                sx={{ color: "#2C2C2C", p: 0.5 }}
              >
                <ArrowBack />
              </IconButton>
            )}
            <Typography
              variant="h5"
              sx={{
                fontWeight: 600,
                color: "#2C2C2C",
                fontSize: isMobile ? "20px" : "24px",
              }}
            >
              All Practitioners
            </Typography>
          </Box>
          {isMobile && (
            <>
              <IconButton
                sx={{ color: "#2C2C2C" }}
                onClick={handleMobileFilterClick}
              >
                <FilterList />
              </IconButton>
              <Menu
                anchorEl={mobileFilterAnchorEl}
                open={Boolean(mobileFilterAnchorEl)}
                onClose={() => setMobileFilterAnchorEl(null)}
              >
                {(
                  [
                    "name",
                    "specialty",
                    "location",
                    "classType",
                    "experience",
                    "upcomingSessions",
                  ] as FilterType[]
                ).map((filterType) => (
                  <MenuItem
                    key={filterType}
                    onClick={(e) => {
                      setActiveMobileFilter(filterType);
                      setMobileSubMenuAnchorEl(e.currentTarget);
                    }}
                  >
                    {filterType.charAt(0).toUpperCase() +
                      filterType.slice(1).replace(/([A-Z])/g, " $1")}
                  </MenuItem>
                ))}
                <MenuItem
                  onClick={() => {
                    clearAllFilters();
                    setMobileFilterAnchorEl(null);
                  }}
                  sx={{ color: "#A0634C", fontWeight: 500 }}
                >
                  Clear All
                </MenuItem>
              </Menu>
              <Menu
                anchorEl={mobileSubMenuAnchorEl}
                open={Boolean(mobileSubMenuAnchorEl)}
                onClose={() => {
                  setMobileSubMenuAnchorEl(null);
                  setActiveMobileFilter(null);
                }}
              >
                {activeMobileFilter &&
                  filterOptions[activeMobileFilter].map((option) => (
                    <MenuItem
                      key={option}
                      selected={filters[activeMobileFilter] === option}
                      onClick={() => {
                        setFilters({
                          ...filters,
                          [activeMobileFilter]: option,
                        });
                        setMobileSubMenuAnchorEl(null);
                        setActiveMobileFilter(null);
                        setMobileFilterAnchorEl(null);
                      }}
                    >
                      {option}
                    </MenuItem>
                  ))}
              </Menu>
            </>
          )}
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ py: 3 }}>
        {!isMobile && (
          <Box sx={{ mb: 3 }}>
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: 1,
                alignItems: "center",
                mb: 2,
              }}
            >
              <FilterButton label="Name" filterType="name" />
              <FilterButton label="Specialty" filterType="specialty" />
              <FilterButton label="Location" filterType="location" />
              <FilterButton label="Class Type" filterType="classType" />
              <FilterButton label="Experience" filterType="experience" />
              <FilterButton
                label="Upcoming Sessions"
                filterType="upcomingSessions"
              />
              <Button
                variant="text"
                onClick={clearAllFilters}
                sx={{
                  color: "#A0634C",
                  textTransform: "none",
                  fontSize: "14px",
                  fontWeight: 500,
                  textDecoration: "underline",
                  ml: 2,
                  "&:hover": {
                    backgroundColor: "transparent",
                    textDecoration: "underline",
                  },
                }}
              >
                Clear All
              </Button>
            </Box>
          </Box>
        )}

        <Box>
          {practitioners.map((data) => (
            <PractitionerCard key={data.id} practitioner={data} />
          ))}
        </Box>

        {practitioners.length === 0 && (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
              No practitioners found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Try adjusting your filters to see more results
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  const user = session?.user;

  if (!user) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  const practitioner = await practitionerList(user.token);

  return {
    props: {
      userDetails: user,
      allPractitioner: practitioner,
    },
  };
};

export default AllPractitionersScreen;
